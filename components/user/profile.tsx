'use client'
import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userProfileFormSchema, UserProfileFormSchema } from "@/schemas/userProfileSchema";
import { Check } from "lucide-react";
import { updateProfile, getUserDetail } from "@/app/actions";
import FieldErrorMessages from "@/components/error/FieldErrorMessages"

import { FormValidationErrors } from "@/lib/types"

export default function Profile() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<boolean>(false);
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<UserProfileFormSchema>({
        resolver: zodResolver(userProfileFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },// Connects Zod schema to React Hook Form
    });

    const getUserInfo = useCallback(async () => {
        const response = await getUserDetail();
        if (response.success) {
            const { name, email } = response.data.user;
            setValue("name", name, { shouldValidate: true });
            setValue("email", email, { shouldValidate: true });
            setIsLoading(false);
        }
    }, [setValue]);

    useEffect(() => {
        setIsLoading(true);
        getUserInfo();
    }, [getUserInfo]);

    const onSubmit = async (data: UserProfileFormSchema) => {

        setIsSubmitting(true);
        setUpdateMsg(false);
        const resp = await updateProfile(data);
        setIsSubmitting(false);
        setFormErrors({});
        if (resp.response == "OK") {
            setUpdateMsg(true);
            setValue("password", "");
            setValue("confirm_password", "");
        }
        else if (resp.response == "VALIDATION") {
            setFormErrors(resp.msg);
        } else {
            setServerMessage(true);
        }


        // setIsSubmitting(true);
        // setUpdateMsg(false);
        // setServerMessage('');
        // const response = await updateProfile(data);
        // setIsSubmitting(false);
        // if (response.success) {
        //     setUpdateMsg(true);
        // } else {
        //     setServerMessage("Something went wrong! Try again");
        // }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-100 rounded-lg p-4">
            {updateMsg && (<p className="flex w-full mb-5 text-sm font-bold vBox sucBox"><Check className="mt-1 mr-1 w-6 h-6" color="green" /> Your Profile has been updated successfully!</p>)}
            {serverMessage && (<p className="flex w-full mb-5 text-sm font-bold vBox errBox">Something went wrong!</p>)}
            <FieldErrorMessages errors={formError} />
            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="name" className="mb-1">
                        Name<sup>*</sup>
                    </Label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Name" disabled={isloading || isSubmitting} />
                        )}
                    />
                    {errors.name && <span className="err text-sm">{errors.name.message}</span>}
                </div>
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Email Address<sup>*</sup>
                    </Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Email" disabled={isloading || isSubmitting} />
                        )}
                    />
                    {errors.email && <span className="err text-sm">{errors.email.message}</span>}
                </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex-1  w-full items-center gap-1.5">
                    <Label htmlFor="password" className="mb-1">Password</Label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type="password" placeholder="Password" disabled={isloading || isSubmitting} />
                        )}
                    />
                    {errors.password && <span className="err text-sm">{errors.password.message}</span>}
                </div>
                <div className="flex-1  w-full items-center gap-1.5">
                    <Label htmlFor="confirm_password" className="mb-1">Confirm Password</Label>
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} type="password" placeholder="Confirm Password" disabled={isloading || isSubmitting} />
                        )}
                    />
                    {errors.confirm_password && <span className="err text-sm">{errors.confirm_password.message}</span>}
                </div>
            </div>
            <Button
                type="submit"
                disabled={isSubmitting || isloading}
                className={`${isSubmitting || isloading
                    ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {(isSubmitting || isloading) ? "just a moment..." : "Update"}
            </Button>
        </form>
    )
}