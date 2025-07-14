import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Skeleton from '@/components/templates/Skeleton'
import { format, parseISO } from 'date-fns';
import { ListProps } from '@/components/templates/Types'

const TemplateRow = ({ loading, templates, pagination }: ListProps) => {

    if (loading) return <Skeleton />;

    return (
        templates.map((template, i) => (
            <TableRow key={i + 1}>
                <TableCell className="text-center font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-center font-medium">{template.name} </TableCell>
                <TableCell className="text-center font-medium">{template.template} </TableCell>
                <TableCell className="text-center font-medium">{template.status == 0 ? (
                    <Badge variant="default" color="gray">Inactive</Badge>
                ) : (
                    <Badge variant="default" color="green">Active</Badge>
                )}</TableCell>
                <TableCell className="text-center font-medium">{format(parseISO(template.created_at), 'EEE dd/MM/yy hh:mm a')}</TableCell>
            </TableRow>)))
}

export default TemplateRow;