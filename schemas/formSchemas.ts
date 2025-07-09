import { z } from "zod";

const signInSchema = z.object({
    email: z.string().email("The email field must contain a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export { signInSchema };