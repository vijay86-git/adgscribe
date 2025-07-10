import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Skeleton from '@/components/logs/Skeleton'
import { format, parseISO } from 'date-fns';
import { ListProps } from '@/components/logs/Types'

const LogRow = ({ loading, logs, pagination }: ListProps) => {

    if (loading) return <Skeleton />;

    return (
        logs.map((log, i) => (
            <TableRow key={i + 1}>
                <TableCell className="text-center font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-center font-medium">{log.user.name} </TableCell>
                <TableCell className="text-center font-medium">{log.user.email} </TableCell>
                <TableCell className="text-center font-medium"><Badge variant="default" color="secondary">{log.action} </Badge></TableCell>
                <TableCell className="text-center font-medium">{log.ip_address} </TableCell>
                <TableCell className="text-center font-medium">{format(parseISO(log.created_at), 'EEE dd/MM/yy hh:mm a')}</TableCell>
            </TableRow>)))
}

export default LogRow;