'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, SignInFormData } from "@/schemas/formSchemas";
import Link from "next/link";
import { signin } from "@/app/actions";
import { redirect } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react";

export function Signin() {

    const { data: session } = useSession();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema), // Connects Zod schema to React Hook Form
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsSubmitting(true);
        setMessage("");
        const response = await signin(data);
        if (response.success) {
            redirect('/dashboard');
        } else {
            setIsSubmitting(false);
            setMessage(response.msg.message);
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                {message && <span className="errBox text-sm vBox">{message}</span>}
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register("email")}
                        id="email"
                        type="email"
                        placeholder=""
                        defaultValue="vijay.singh@adgonline.in"
                        disabled={isSubmitting}
                    />
                    {errors.email && <span className="err text-sm">{errors.email.message}</span>}
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href={'/forgot-password'}
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        defaultValue="12345678"
                        disabled={isSubmitting}
                        {...register("password")}
                    />
                    {errors.password && <span className="err text-sm">{errors.password.message}</span>}
                </div>
                <div className="flex flex-col gap-3">
                    <Button
                        type="submit"
                        className={`w-full`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Just a moment" : "Submit"}
                    </Button>

                    {session ? (
                        <>
                            <p>Signed in as {session.user?.email}</p>
                            <button onClick={() => signOut()}>Sign out</button>
                        </>
                    ) : (
                        <Button type="button" onClick={() => signIn("google")} variant="outline" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Login with Google
                        </Button>
                    )}

                </div>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form >
    );
}