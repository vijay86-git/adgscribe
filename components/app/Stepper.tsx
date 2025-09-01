'use client'
import { Search, Smartphone, IdCard, Folder, Loader2, Info, Mic, MicOff, CheckCircle, FileText, User, User2, Music4, UserPlus, Timer, AudioLines, Check, Plus, Printer } from "lucide-react";
export default function Stepper({ stepper }: { stepper: number }) {

    return (
        <div className="my-2 flex items-center justify-center w-full max-w-3xl mx-auto">

            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${stepper >= 1 ? "bg-[#0a848e] text-white" : "bg-gray-200 text-gray-500"
                    }`}>{stepper >= 1 ? <Check /> : '01'} </div>
                <div className="text-sm mt-2 ${stepper === 1 ? 'font-semibold text-[#0a848e]' : ''}">Upload/ Record</div>
            </div>

            <div className="flex-1 h-0.5 bg-stone-600"></div>

            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${stepper >= 2 ? "bg-[#0a848e] text-white" : "bg-gray-200 text-gray-500"
                    }`}>{stepper >= 2 ? <Check /> : '02'}</div>
                <div className="text-sm mt-2 ${stepper === 2 ? 'font-semibold text-[#0a848e]' : ''}">Transcription</div>
            </div>

            <div className="flex-1 h-0.5 bg-gray-300"></div>

            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 ${stepper >= 3 ? "bg-[#0a848e] text-white" : "bg-gray-200 text-gray-500"
                    }`}>{stepper >= 3 ? <Check /> : '03'}</div>
                <div className="text-sm mt-2 ${stepper === 3 ? 'font-semibold text-[#0a848e]' : ''}">Generate Notes</div>
            </div>
        </div >
    )
}