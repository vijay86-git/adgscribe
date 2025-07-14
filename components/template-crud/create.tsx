'use client'
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { templateFormSchema, TemplateFormSchema } from "@/schemas/templateSchema";
import { Check } from "lucide-react";
import { templateStore } from "@/app/actions";
import FieldErrorMessages from "@/components/error/FieldErrorMessages"
import { useRouter } from 'next/navigation';

import { FormValidationErrors } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea";

export default function Create() {

    const router = useRouter(); // ✅ Called at the top level

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
    } = useForm<TemplateFormSchema>({
        resolver: zodResolver(templateFormSchema),
        defaultValues: {
            name: "",
            template: "",
        },// Connects Zod schema to React Hook Form
    });

    const onSubmit = async (data: TemplateFormSchema) => {

        console.log(data);

        setIsSubmitting(true);
        setUpdateMsg(false);
        const resp = await templateStore(data);
        setIsSubmitting(false);
        setFormErrors({});
        if (resp.response == "OK") {

            router.push('/my-templates');
            //     setUpdateMsg(true);
            //     setValue("password", "");
            //     setValue("confirm_password", "");
        }
        else if (resp.response == "VALIDATION") {
            setFormErrors(resp.msg);
        } else {
            setServerMessage(true);
        }
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
            </div>
            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Template<sup>*</sup>
                    </Label>
                    <Controller
                        name="template"
                        control={control}
                        render={({ field }) => (
                            <Textarea {...field} className="h-10" placeholder="Template" disabled={isloading || isSubmitting} />
                        )}
                    />
                    {errors.template && <span className="err text-sm">{errors.template.message}</span>}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting || isloading}
                className={`${isSubmitting || isloading
                    ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {(isSubmitting || isloading) ? "just a moment..." : "Submit"}
            </Button>
        </form>
    )
}