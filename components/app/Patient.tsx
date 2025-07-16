import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Patient() {

    return (
        < div className="flex gap-2" >
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
        </div>)
}