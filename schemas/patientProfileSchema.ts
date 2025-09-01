import { z } from 'zod';

export const patientProfileFormSchema = z.object({
    name: z.string().nonempty('The name field is required'),
    personal_health_number: z.string().nonempty('Personal health number is required'),
    age: z.coerce.number().optional(),
    contact_number: z.string().optional(),
});

export type PatientProfileFormSchema = z.infer<typeof patientProfileFormSchema>;