import { z } from 'zod';

export const clinicProfileOptionalSchema = z.object({
    no_of_doctors: z.number().optional(),
    daily_monthly_patient_footfall: z.number().optional(),
    designation: z.string().optional(),
    specializations: z.array(z.string()).optional(),
    website_clinic_url: z.string().optional(),
    year_establishment: z.string().optional(),
    ai_filter: z.string().optional()
});

export type ClinicProfileOptionalSchema = z.infer<typeof clinicProfileOptionalSchema>;