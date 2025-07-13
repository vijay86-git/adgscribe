import { z } from 'zod';

export const clinicProfileMandatoryFormSchema = z.object({
    clinic_name: z.string().nonempty('The name field is required'),
    country: z.number({
        required_error: 'The Country field is required',
        invalid_type_error: 'Please select a country',
    }).min(1, 'The Country field is required'),
    state: z.string().nonempty('The state field is required').max(96, 'The state must not exceed 96 characters'),
    city: z.string().nonempty('The city field is required').max(96, 'The city must not exceed 96 characters'),
    street_address: z.string().nonempty('The address field is required').max(255, 'The address must not exceed 255 characters'),
    patient_id_prefix: z.string().nonempty('The prefix field is required').max(8, 'The prefix must not exceed 8 characters').regex(/^[a-zA-Z0-9 ]+$/, 'The prefix must be alphanumeric'),
    upload_clinic_logo: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => file === undefined || file.size > 0,
            { message: 'Logo file cannot be empty' }
        )
        .refine(
            (file) =>
                file === undefined ||
                ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
            { message: 'Only JPEG, JPG, PNG images are allowed' }
        )
});

export type ClinicProfileMandatoryFormSchema = z.infer<typeof clinicProfileMandatoryFormSchema>;