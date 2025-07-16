import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";

export default function Patient() {

    return (
        <form className="space-y-4">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search Patient by Name, Contact Number..."
                    className="pl-9"
                // value={value}
                // onChange={(e) => onChange(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-center m-5 space-x-4 w-[95%]">
                <div className="flex-grow border-t border-dashed border-gray-400"></div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
                    OR
                </div>
                <div className="flex-grow border-t border-dashed border-gray-400"></div>
            </div>

            <div className="flex gap-2">
                <Input
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Patient Name"
                />
                <Input
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Personal Health Number"
                />
                <Input
                    type="number"
                    min="0"
                    className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Age"
                />
                <Input
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Contact Number"
                />
                <Select>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Male</SelectItem>
                        <SelectItem value="dark">Female</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </form>)
}