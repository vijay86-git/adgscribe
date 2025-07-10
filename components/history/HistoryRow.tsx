import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Edit, Trash } from "lucide-react";
import Skeleton from '@/components/history/skeleton'

import { ListProps } from '@/components/history/types'

const List = ({ loading, histories, pagination }: ListProps) => {

    if (loading) return <Skeleton />;

    return (
        histories.map((history, i) => (
            <TableRow key={i + 1}>
                <TableCell className="text-center font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-center font-medium">{history.patient_id} </TableCell>
                <TableCell className="text-center font-medium">{history.patient_name} </TableCell>
                <TableCell className="text-center font-medium">{history.personal_health_number} </TableCell>
                <TableCell className="text-center font-medium">{history.contact_number} </TableCell>
                <TableCell className="text-center font-medium">{history.created_at} </TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2 md:flex-row">
                        <Edit size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
                        <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
                    </div>
                </TableCell>
            </TableRow>)))
}

export default List;