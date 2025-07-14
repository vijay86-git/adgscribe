import { z } from 'zod';

export const templateFormSchema = z.object({
    name: z.string().min(1, 'The name field is required'),
    template: z.string().min(1, "The template field is required"),
    status: z.string().min(1, "The status field is required")
});

export type TemplateFormSchema = z.infer<typeof templateFormSchema>;
