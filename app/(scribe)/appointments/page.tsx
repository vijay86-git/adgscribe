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

import { Play, CalendarSync, Trash } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
								      		<h2 className="font-bold mb-2">Available Slots <small className="text-xs text-gray-500">(Wed, 20 Aug' 25)</small></h2>
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

							      			<div class="w-full border border-gray-200 mb-3 rounded-md shadow-sm text-sm">
											  <table class="w-full text-gray-700">
											    <tbody>
											      <tr class="bg-gray-100">
											        <td class="font-bold px-4 py-2">Doctor:</td>
											        <td class="px-4 py-2">ankit bisht..</td>
											      </tr>
											      <tr>
											        <td class="font-bold px-4 py-2">Date:</td>
											        <td class="px-4 py-2">2025-09-18</td>
											      </tr>
											      <tr class="bg-gray-100">
											        <td class="font-bold px-4 py-2">Time:</td>
											        <td class="px-4 py-2">10:00 AM</td>
											      </tr>
											    </tbody>
											  </table>
											</div>


							      			<Button>Confirm Appointment</Button>

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
