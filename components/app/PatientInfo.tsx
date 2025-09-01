'use client'
import React, { useState } from "react";

import { SearchPatient } from '@/components/patient/Types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Smartphone, IdCard, Folder, Loader2, Info, Mic, MicOff, CheckCircle, FileText, User, User2, Music4, UserPlus, Timer, AudioLines, Check, Plus, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PatientInfoProps = {
    user: SearchPatient;
};

export default function PatientInfo({ user }: PatientInfoProps) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="mt-3 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">
            <div className="flex justify-end w-full mb-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Badge onClick={() => setOpen(true)} className="cursor-pointer flex items-center gap-1">
                            <User size={16} />
                            <Plus size={16} />
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Update Patient</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex gap-5">
                <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1 pl-2">
                    <div className="text-neural-300 flex items-center">
                        <User />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-700">Patient Name</p>
                        <p className="text-md font-semibold tracking-wider">{user.label}</p>
                    </div>
                </div>

                <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                    <div className="text-neural-300 flex items-center pl-2">
                        <IdCard />                        </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-700">Personal Health Number</p>
                        <p className="text-md font-semibold tracking-wider">{user.personal_health_number}</p>
                    </div>
                </div>

                <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                    <div className="text-neural-300 flex items-center pl-2">
                        <Smartphone />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-700">Contact Number</p>
                        <p className="text-md font-semibold tracking-wider">{user.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}