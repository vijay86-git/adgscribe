import { TableCell, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react";
import Skeleton from '@/components/history/Skeleton'
import { ListProps } from '@/components/history/Types'

const HistoryRow = ({ loading, histories, pagination }: ListProps) => {

    if (loading) return <Skeleton />;

    return (
        histories.map((history, i) => (
            <TableRow key={i + 1}>
                <TableCell className="text-left font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-left font-medium">{history.patient_id} </TableCell>
                <TableCell className="text-left font-medium">{history.patient_name} </TableCell>
                <TableCell className="text-left font-medium">{history.personal_health_number} </TableCell>
                <TableCell className="text-left font-medium">{history.contact_number} </TableCell>
                <TableCell className="text-left font-medium">{history.created_at} </TableCell>
                <TableCell className="text-left">
                    <div className="flex items-center gap-2 md:flex-row">
                        <Eye size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
                    </div>
                </TableCell>
            </TableRow>)))
}

export default HistoryRow;