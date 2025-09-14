'use client'
import Header from "@/components/header"
import {
    SidebarInset
} from "@/components/ui/sidebar"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@/components/ui/table";

import { Play, CalendarSync, Trash, CalendarDays, UserRound, Stethoscope, Clock8 } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"

export default function Page() {

	const handleSelect = (date) => {
		let dt = new Date(date);
    	console.log("Local:", dt.getFullYear(), String(dt.getMonth() + 1).padStart(2, "0"), String(dt.getDate()).padStart(2, "0"));
    };

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex w-full flex-col">
                    <h1 className="scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">Appointments</h1>
                        <Tabs defaultValue="mandatory">
                            <TabsList>
                                <TabsTrigger value="mandatory">Booking</TabsTrigger>
                                <TabsTrigger value="business">Appointment History</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mandatory">
                            	<div className="flex gap-5">
                            			<div className="w-1/2">
			                               <FullCalendar
									        plugins={[dayGridPlugin]}
									        initialView='dayGridMonth'
									        weekends={false}
									        dayCellDidMount={(arg) => {

										        let cellDate = arg.date;

										        // Format selected date
												const date = arg.date;
												const today = new Date();
												today.setHours(0,0,0,0);  // remove time part for fair comparison

										        // Only show button for future dates
										        if (cellDate >= today) {
										          let p = document.createElement("p");
			    								  p.className = "text-center";

										          const btn = document.createElement("button");
										          btn.innerText = "Select";
										          btn.className =
										            "relative top-[-5px] cursor-pointer w-1/2 text-center gap-2 bg-[#0f172a] text-white text-sm rounded px-2 py-1 hover:bg-[#1e293b]";
										          btn.onclick = (e) => {
										            e.stopPropagation(); // prevent triggering dateClick
										            handleSelect(cellDate);
										          };

										          // Append button inside p
			    								  p.appendChild(btn);

										          arg.el.appendChild(p);
										        }
										      }}
									      />
									    </div>
								      	<div className="w-1/2">
								      		<h2 className="font-bold mb-2">Available Slots <small className="text-xs text-gray-800 bg-green-200 px-2 py-1 border border-green-400 rounded-sm">(Wed, 20 Aug' 25)</small></h2>
								      		<ul className="flex flex-wrap gap-2 mb-3">
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="10:00 AM" />&nbsp;<span>10:00 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="10:15 AM" />&nbsp;<span>10:15 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="10:30 AM" />&nbsp;<span>10:30 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="10:45 AM" />&nbsp;<span>10:45 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="11:00 AM" />&nbsp;<span>11:00 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="11:15 AM" />&nbsp;<span>11:15 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="11:30 AM" />&nbsp;<span>11:30 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="11:45 AM" />&nbsp;<span>11:45 AM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="12:00 PM" />&nbsp;<span>12:00 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="12:15 PM" />&nbsp;<span>12:15 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="12:30 PM" />&nbsp;<span>12:30 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="12:45 PM" />&nbsp;<span>12:45 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="01:00 PM" />&nbsp;<span>01:00 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="01:15 PM" />&nbsp;<span>01:15 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="01:30 PM" />&nbsp;<span>01:30 PM</span></li>
							      				<li className="border border-gray-200 rounded-md p-2"><input type="radio" name="slot" value="01:45 PM" />&nbsp;<span>01:45 PM</span></li>
							      			</ul>

							      			<div className="w-full border border-gray-200 mb-3 rounded-md shadow-sm text-sm">
											  <table className="w-full text-gray-700">
											    <tbody>
											      <tr className="bg-gray-100">
											        <td className="font-bold px-4 py-2 flex gap-1"><Stethoscope className="mt-1" size={15} />Doctor</td>
											        <td className="px-4 py-2"><span className="bg-yellow-400 px-2 py-1 rounded-md font-bold">Ankit Bisht</span></td>
											      </tr>
											      <tr>
											        <td className="font-bold px-4 py-2 flex gap-1"><CalendarDays className="mt-1" size={15} /> Date</td>
											        <td className="px-4 py-2 font-bold">2025-09-18</td>
											      </tr>
											      <tr className="bg-gray-100">
											        <td className="font-bold px-4 py-2 flex gap-1"><Clock8 className="mt-1" size={15}  />Time</td>
											        <td className="px-4 py-2 font-bold">10:00 AM</td>
											      </tr>
											    </tbody>
											  </table>
											</div>


							      			<Dialog open={false}>
										        <DialogTrigger asChild>
										            <Button className="ml-4 flex items-center tracking-wide gap-2 bg-[#0f172a] text-white text-sm font-bold px-4 py-2 rounded-full shadow">
										                 Confirm Appointment
										            </Button>
										        </DialogTrigger>
										        <DialogContent className="sm:max-w-2xl w-full md:max-w-2xl lg:max-w-2xl">
										            <DialogHeader>
										                <DialogTitle>Book Appointment</DialogTitle>
										                <DialogDescription>
										                </DialogDescription>
										            </DialogHeader>
										            <form className="space-y-4 border border-gray-100 rounded-lg p-4">

										            	<div className="mb-4">
														  <div className="flex justify-center">
														    <button className="w-full px-3 py-2 text-sm bg-blue-50 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-100">
														      + Add New Patient
														    </button>
														  </div>
														</div>

														<div className="mb-6">
													      <label className="block text-sm font-medium mb-2">Doctor</label>
													      <p className="text-sm text-gray-700 flex gap-2"><Stethoscope size={18} /> <strong>Alex Smith Flemding</strong></p>
													    </div>

													    <div className="mb-6">
													      <label className="block text-sm font-medium mb-2">Patient</label>
													      <p className="text-sm text-gray-700 flex gap-2"><UserRound size={18} /> <strong>Alex Smith Flemding</strong></p>
													    </div>


													    


													    <div className="mb-4">
													      <label className="block text-sm font-medium mb-1">Appointment Date/Time</label>
													      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm">
													        <span className="text-gray-500"><CalendarDays size={16} /></span>
													        <span>22 Aug 2025&nbsp;&nbsp;11:15 AM</span>
													      </div>
													    </div>

													    <div className="mb-4">
													      <label className="block text-sm font-medium mb-1">Note</label>
													      <textarea
													        placeholder="Enter reason for visit..."
													        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
													      ></textarea>
													    </div>

										               
										                <DialogFooter>
										                    <Button type="submit" disabled={true}>
										                         Submit
										                    </Button>
										                </DialogFooter>
										            </form>
										        </DialogContent>
										    </Dialog>




							      			{/*<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
											  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
											    <div className="flex items-center justify-between mb-4">
											      <h2 className="text-lg font-semibold">Book Appointment</h2>
											      <button className="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
											    </div>

											    <div className="mb-4">
												  <div className="flex justify-center">
												    <button className="w-full px-3 py-2 text-sm bg-blue-50 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-100">
												      + Add New Patient
												    </button>
												  </div>
												</div>

											    <div className="mb-6">
											      <label className="block text-sm font-medium mb-2">Patient Name</label>
											      <p className="text-sm text-gray-700 flex gap-2"><UserRound size={18} /> <strong>Alex Smith Flemding</strong></p>
											    </div>

											    <div className="mb-4">
											      <label className="block text-sm font-medium mb-1">Appointment Date/Time</label>
											      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm">
											        <span className="text-gray-500"><CalendarDays size={16} /></span>
											        <span>22 Aug 2025&nbsp;&nbsp;11:15 AM</span>
											      </div>
											    </div>

											    <div className="mb-4">
											      <label className="block text-sm font-medium mb-1">Note</label>
											      <textarea
											        placeholder="Enter reason for visit..."
											        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
											      ></textarea>
											    </div>

											    <div className="flex justify-end gap-2">
											    	<button className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-300">
											        Submit
											      </button>
											      <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100">
											        Close
											      </button>
											      
											    </div>

											  </div>
											</div>*/}


								      	</div>
							   </div>
                            </TabsContent>
                            <TabsContent value="business">
                                <Table className="w-full">
			                        <TableHeader>
			                            <TableRow>
			                                <TableHead className="text-left bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
			                                    #
			                                </TableHead>
			                                <TableHead className="text-left bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
			                                    Title
			                                </TableHead>
			                                <TableHead className="text-left bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
			                                    Patient
			                                </TableHead>

			                                 <TableHead className="text-left bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
			                                    Appointment Date/Time
			                                </TableHead>

			                                <TableHead className="text-left bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
			                                    Action
			                                </TableHead>
			                            </TableRow>
			                        </TableHeader>
			                        <TableBody>
			                        	<TableRow>
								            <TableCell className="text-left font-medium">
								                1
								            </TableCell>
								            <TableCell className="text-left font-medium">Sam </TableCell>
								            <TableCell className="text-left font-medium">Sam Alt </TableCell>
								            <TableCell className="text-left font-medium">Wed, 20 Aug' 25 01:00 PM </TableCell>
								            <TableCell className="text-left">
								                <div className="flex items-center gap-2 md:flex-row">

									                	<TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <Play size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Start Session</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>

													    <TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <CalendarSync size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Reschedule Appointment</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>

													    <TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Cancel Appointment</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>
								                    
								                </div>
								            </TableCell>
								        </TableRow>


								        <TableRow>
								            <TableCell className="text-left font-medium">
								                2
								            </TableCell>
								            <TableCell className="text-left font-medium">Sam </TableCell>
								            <TableCell className="text-left font-medium">Sam Alt </TableCell>
								            <TableCell className="text-left font-medium">Wed, 20 Aug' 25 01:00 PM </TableCell>
								            <TableCell className="text-left">
								                <div className="flex items-center gap-2 md:flex-row">

									                	<TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <Play size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Start Session</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>

													    <TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <CalendarSync size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Reschedule Appointment</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>

													    <TooltipProvider>
													      <Tooltip>
													        <TooltipTrigger asChild>
													          <button className="p-2 rounded-full hover:bg-gray-100">
													            <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
													          </button>
													        </TooltipTrigger>
													        <TooltipContent>
													          <p>Cancel Appointment</p>
													        </TooltipContent>
													      </Tooltip>
													    </TooltipProvider>
								                    
								                </div>
								            </TableCell>
								        </TableRow>



			                            
			                        </TableBody>
			                    </Table>
                            </TabsContent>
                        </Tabs>
                </div>
            </div>
        </SidebarInset>
    )
}
