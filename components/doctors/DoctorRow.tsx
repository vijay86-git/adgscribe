import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Skeleton from "@/components/doctors/Skeleton";
import { ListProps } from "@/components/doctors/Types";
const DoctorRow = ({ doctors, pagination, initial }: ListProps) => {
    if (initial) return <Skeleton />;

    return doctors.map((doctor, i) => (
        <TableRow key={i + 1}>
            <TableCell className="text-left font-medium">
                {(pagination.current_page - 1) *
                    Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) +
                    i +
                    1}
            </TableCell>
            <TableCell className="text-left font-medium">{doctor.name} </TableCell>
            <TableCell className="text-left font-medium">{doctor.email} </TableCell>
            <TableCell className="text-left">
                <div className="flex items-center gap-2 md:flex-row">
                    <Edit size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
                    <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
                </div>
            </TableCell>
        </TableRow>
    ));
};

export default DoctorRow;