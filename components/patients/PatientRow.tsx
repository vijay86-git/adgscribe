import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Edit, Trash } from "lucide-react";
import Skeleton from '@/components/patients/Skeleton'
import { ListProps } from '@/components/patients/Types'
import Link from 'next/link'
import { ROUTES } from '@/lib/routes'

const PatientRow = ({ initial, patients, pagination }: ListProps) => {

  if (initial) return <Skeleton />;

  return (
    patients && patients.length > 0 ? (
      patients.map((patient, i) => (
        <TableRow key={patient.personal_health_number}>
          <TableCell className="text-left font-medium">{(pagination.current_page - 1) * (Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT)) + i + 1}</TableCell>
          <TableCell className="text-left font-medium">{patient.patient_id} </TableCell>
          <TableCell className="text-left font-medium">{patient.patient_name} </TableCell>
          <TableCell className="text-left font-medium">{patient.age} </TableCell>
          <TableCell className="text-left font-medium">{patient.contact_number} </TableCell>
          <TableCell className="text-left font-medium">{patient.personal_health_number}</TableCell>
          <TableCell className="text-left font-medium"><Badge variant="default" color="secondary">Active</Badge></TableCell>
          <TableCell className="text-left">
            <div className="flex items-center gap-2 md:flex-row">
              <Edit size={18} className="w-5 h-5 text-green-700 cursor-pointer" />
              <Trash size={18} className="w-5 h-5 text-red-700 cursor-pointer" />
            </div>
          </TableCell>
        </TableRow>)))
      : (
        <TableRow>
          <TableCell colSpan={8} className="text-left text-gray-800">
            <p>You have not added any patients yet. Click <Link href={ROUTES.addPatient}><strong>Add New Patient</strong></Link> to begin.</p>
          </TableCell>
        </TableRow>
      )
  );
}

export default PatientRow;