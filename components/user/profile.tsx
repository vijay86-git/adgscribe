'use client'
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { userProfileFormSchema } from "@/schemas/userProfileSchema";
import { Loader2 } from "lucide-react";
type FormData = z.infer<typeof userProfileFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;
type FormValidationErrors = {
    [field: string]: string[];
};

export default function Profile({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [formError, setFormErrors] = useState<FormValidationErrors>({});
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    const [updateMsg, setUpdateMsg] = useState(false);
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', confirm_password: '' });

    const validateForm = (data: FormData): FormErrors => {
        try {
            userProfileFormSchema.parse(data);
            return {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.flatten().fieldErrors;
            }
            return {};
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getUserInfo = async () => {
        const res = await fetch(`/api/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await res.json();
        if (response.success) {
            const { name, email } = response.data;
            setFormData((prev) => ({ ...prev, name, email }));
            setIsLoading(false);
        }

        if (response?.form_validation) {
            setErrors(response.form_validation);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getUserInfo();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {

            setFormErrors({});

            try {
                setServerMessage('');
                setIsSubmitting(true);
                const res = await fetch(`/api/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                setIsSubmitting(false);
                if (data.success) {
                    setUpdateMsg(true);
                    setFormData((prev) => ({ ...prev, password: '', conform_password: '' }));
                }

                if (data?.msg?.errors) {
                    setFormErrors(data.msg.errors);
                }

                if (data?.msg?.message) {
                    setServerMessage(data.msg.message);
                }

                // else {
                // 	if (typeof data?.form_validation != "undefined") {
                // 		setFormErrors(data.form_validation);
                // 	} else {
                // 		setServerMessage(data.msg.message);
                // 	}

                //}
            } catch (err: unknown) {
                setIsSubmitting(false);
                if (err instanceof Error) {
                    setServerMessage(err.message); // // works, `e` narrowed to string
                } else if (e instanceof Error) {
                    setServerMessage("Oops! Something went wrong"); // works, `e` narrowed to Error
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border border-gray-100 rounded-lg p-4">
            {updateMsg && (<p className="flex w-full sucBox mb-5 text-sm">Your Profile has been updated successfully!</p>)}
            {isSubmitting && (<p className="flex w-full mb-5 text-sm"><Loader2 className="h-4 w-4 animate-spin text-gray-500 size-4" /></p>)}
            <div className="mb-5">
                {Object.entries(formError).map(([field, messages]) => (
                    <div key={field}>
                        <ul>
                            {messages.map((msg, index) => (
                                <li className="err text-sm" key={index}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="name">
                        Name<sup>*</sup>
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="mt-2"
                        disabled={isSubmitting}
                        name="name"
                        autoComplete="off"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name[0]}</p>
                    )}
                </div>

                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email">
                        Email Address<sup>*</sup>
                    </Label>
                    <Input
                        name="email"
                        type="text"
                        id="email"
                        placeholder="Email Address"
                        className="mt-2"
                        disabled={isSubmitting}
                        autoComplete="off"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email[0]}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex-1  w-full items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="mt-2"
                        disabled={isSubmitting}
                        name="password"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password[0]}</p>
                    )}
                </div>

                <div className="flex-1  w-full items-center gap-1.5">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input
                        type="password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        className="mt-2"
                        disabled={isSubmitting}
                        name="confirm_password"
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    {errors.confirm_password && (
                        <p className="text-red-500 text-xs">{errors.confirm_password[0]}</p>
                    )}
                </div>
            </div>
            <Button
                type="submit"
                disabled={isSubmitting || isloading}
                className={`${isSubmitting || isloading
                    ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                Update
            </Button>
        </form>
    )
}