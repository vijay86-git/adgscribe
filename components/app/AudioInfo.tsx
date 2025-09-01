'use client'
import React, { useState } from "react";

import { SearchPatient } from '@/components/patient/Types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Smartphone, IdCard, Folder, Loader2, Info, Mic, MicOff, CheckCircle, FileText, User, User2, Music4, UserPlus, Timer, AudioLines, Check, Plus, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Audio } from "@/components/app/Types"

export default function AudioInfo({ file }: { file: Audio }) {

    return (
        <>
            <div className="flex  bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-2 pl-2">
                <div className="text-neural-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-audio2-icon lucide-file-audio-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="3" cy="17" r="1" /><path d="M2 17v-3a4 4 0 0 1 8 0v3" /><circle cx="9" cy="17" r="1" /></svg>

                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">File Name</p>
                    <p className="text-md font-semibold text-[#0a848e]">{file.name ?? 'N/A'}</p>
                </div>
            </div>

            <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                <div className="text-neural-300 flex items-center pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">File size</p>
                    <p className="text-md font-semibold text-[#0a848e]">{file.size ?? 'N/A'}</p>
                </div>
            </div>

            <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400  rounded-sm p-2 items-center space-x-2 flex-1">
                <div className="text-neural-300 flex items-center pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock9-icon lucide-clock-9"><path d="M12 6v6H8" /><circle cx="12" cy="12" r="10" /></svg>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-md font-semibold text-[#0a848e]">{file.duration ?? 'N/A'}</p>
                </div>
            </div>
        </>
    )
}