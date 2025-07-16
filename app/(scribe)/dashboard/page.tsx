import type { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Scroll, NotebookPen, Users, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
    title: "ADGScribe | AI Medical Transcription Tool for Healthcare",
    description: "ADGScribe is an AI-powered medical transcription platform that converts clinical speech to structured notes in real-time, improving accuracy and patient care",
};

export default function Page() {

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                ADG Scribe
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5 my-3">
                <div className="dbox bg-white p-4 border-1 rounded-lg flex items-center justify-between transition-transform duration-300 hover:scale-102">
                    <div>
                        <p className="text-gray-600 text-md mb-2 font-bold">Total Transcriptions</p>
                        <p className="text-3xl font-semibold text-stone-700">21</p>
                    </div>
                    <div className="w-12 h-12 rounded-full cclr flex items-center justify-center">
                        <Scroll className="" size={28} color="#57a3d4" />
                    </div>
                </div>
                <div className="dbox bg-white p-4 border-1 rounded-lg flex items-center justify-between transition-transform duration-300 hover:scale-102">
                    <div>
                        <p className="text-gray-600 text-md mb-2 font-bold">Total Notes</p>
                        <p className="text-3xl font-semibold text-stone-700">121</p>
                    </div>
                    <div className="w-12 h-12 rounded-full cclr flex items-center justify-center">
                        <NotebookPen size={28} color="#57a3d4" />
                    </div>
                </div>
                <div className="dbox bg-white p-4 border-1 rounded-lg flex items-center justify-between transition-transform duration-300 hover:scale-102">
                    <div>
                        <p className="text-gray-600 text-md mb-2 font-bold">Total Patients</p>
                        <p className="text-3xl font-semibold text-stone-700">2,015</p>
                    </div>
                    <div className="w-12 h-12 rounded-full cclr flex items-center justify-center">
                        <Users className="" size={28} color="#57a3d4" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 my-3">
                <div className="bg-white p-4 rounded-lg shadow border-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-stone-700 ">Transcription <Badge className="text-sm">11,278</Badge></h3>
                        <span className="text-sm text-gray-400 flex gap-2"><CalendarDays size={16} /> Last 10 Days</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-stone-700 ">Notes <Badge className="text-sm">9,278</Badge></h3>
                        <span className="text-sm text-gray-400 flex gap-2"><CalendarDays size={16} /> Last 10 Days</span>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}
