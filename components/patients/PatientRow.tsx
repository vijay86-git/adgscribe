import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Edit, Trash } from "lucide-react";
import Skeleton from '@/components/patients/Skeleton'
import { ListProps } from '@/components/patients/Types'

const PatientRow = ({ initial, patients, pagination }: ListProps) => {

    if (initial) return <Skeleton />;

    return (
        patients.map((patient, i) => (
            <TableRow key={patient.personal_health_number}>
                <TableCell className="text-center font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
                <TableCell className="text-center font-medium">{patient.patient_id} </TableCell>
                <TableCell className="text-center font-medium">{patient.patient_name} </TableCell>
                <TableCell className="text-center font-medium">{patient.age} </TableCell>
                <TableCell className="text-center font-medium">{patient.contact_number} </TableCell>
                <TableCell className="text-center font-medium">{patient.personal_health_number}</TableCell>
                <TableCell className="text-center font-medium"><Badge variant="default" color="secondary">Active</Badge></TableCell>
                <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2 md:flex-row">
                        <Edit size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
                        <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
                    </div>
                </TableCell>
            </TableRow>)))
}

export default PatientRow;