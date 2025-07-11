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

import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Scroll, NotebookPen, Users } from "lucide-react";

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5">
                <div className="bg-white p-4 border-1 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm mb-2 font-bold">Total Transcriptions</p>
                        <p className="text-3xl font-semibold text-orange-500">21</p>
                    </div>
                    <Scroll className="" size={28} color="#333" />
                </div>
                <div className="bg-white p-4 border-1 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm mb-2 font-bold">Total Notes</p>
                        <p className="text-3xl font-semibold text-yellow-600">121</p>
                    </div>
                    <NotebookPen className="" size={28} color="#333" />
                </div>
                <div className="bg-white p-4 border-1 rounded-lg shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm mb-2 font-bold">Total Patients</p>
                        <p className="text-3xl font-semibold text-teal-600">2,015</p>
                    </div>
                    <Users className="" size={28} color="#333" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5">
                <div className="bg-white p-4 rounded-lg shadow border-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Transcription</h3>
                        <span className="text-sm text-gray-400">Last 10 Days</span>
                    </div>
                    <Card>
                        <CardContent>
                            11
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">Notes</h3>
                        <span className="text-sm text-gray-400">Last 10 Days</span>
                    </div>
                    <Card>
                        <CardContent>
                            12
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SidebarInset>
    )
}
