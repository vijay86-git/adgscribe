import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Skeleton from '@/components/templates/Skeleton'
import { format, parseISO } from 'date-fns';
import { ListProps } from '@/components/templates/Types'
import { Eye } from "lucide-react";
import Link from 'next/link';

const TemplateRow = ({ loading, templates, pagination }: ListProps) => {

    if (loading) return <Skeleton />;

    return (
        templates.map((template, i) => (
            <TableRow key={i + 1}>
                <TableCell className="text-left font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-left font-medium">{template.name} </TableCell>
                <TableCell className="text-left font-medium">{template.template} </TableCell>
                <TableCell className="text-left font-medium">{template.status == 0 ? (
                    <Badge variant="default" color="gray">Inactive</Badge>
                ) : (
                    <Badge variant="default" color="green">Active</Badge>
                )}</TableCell>
                <TableCell className="text-left font-medium">{format(parseISO(template.created_at), 'EEE dd/MM/yy hh:mm a')}</TableCell>
                <TableCell className="text-left">
                    <div className="flex items-center gap-2 md:flex-row">
                        <Link href={`/template/view/${template.uuid}`}>
                            <Eye size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
                        </Link>
                    </div>
                </TableCell>
            </TableRow >)))
}

export default TemplateRow;