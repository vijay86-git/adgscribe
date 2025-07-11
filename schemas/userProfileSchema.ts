import { z } from 'zod';

export const userProfileFormSchema = z.object({
    name: z.string().min(1, 'The name field is required'),
    email: z.string().email("The email field must be a valid email address.."),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
}).superRefine((data, ctx) => {
    const { password, confirm_password } = data;
    // If password is provided
    if (password) {
        // Check length
        if (password.length < 6) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_small,
                minimum: 6,
                type: "string",
                inclusive: true,
                message: "Password must be at least 6 characters long.",
                path: ["password"],
            });
        }
        // Confirm password must match
        if (password !== confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password and Confirm Password must match.",
                path: ["confirm_password"],
            });
        }
    }
    // If confirm_password is present but password is not
    if (confirm_password && !password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must be provided when confirming password.",
            path: ["password"],
        });
    }
});

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>;
