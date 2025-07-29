import { z } from "zod";

export const patientSchema = z.object({
    name: z.string().min(1, { message: "This field is required" }),
    personal_health_number: z.string().min(6, { message: "This field must be at least 6 characters" }),
    age: z
        .coerce.number({ invalid_type_error: "This field is required" })
        .min(1, { message: "This field must be at least 1" }),
    contact_number: z.string().min(8, { message: "This field must be at least 8 digits" }),
    gender: z.string().min(1, { message: "This field is required" }),
});

export type PatientFormData = z.infer<typeof patientSchema>;