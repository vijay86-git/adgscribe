'use client'
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { patientSchema, PatientFormData } from "@/schemas/patientSchemas";
import { Check } from "lucide-react";
import { savePatient } from "@/app/actions";
import FieldErrorMessages from "@/components/error/FieldErrorMessages"
import { FormValidationErrors } from "@/lib/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Create() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<boolean>(false);
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            name: "",
            personal_health_number: "",
            age: 0,
            contact_number: "",
            gender: ""
        },// Connects Zod schema to React Hook Form
    });

    const onSubmit = async (data: PatientFormData) => {

        setIsSubmitting(true);
        setUpdateMsg(false);
        const resp = await savePatient(data);
        setIsSubmitting(false);
        setFormErrors({});
        if (resp.response == "OK") {
            setUpdateMsg(true);
            setValue("name", "");
            setValue("personal_health_number", "");
            setValue("age", 0);
            setValue("contact_number", "");
            setValue("gender", "");
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
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-200 pt-10 pb-10 pl-5 pr-5 rounded-lg p-4">
            {updateMsg && (<p className="flex w-full mb-5 text-sm font-bold vBox sucBox"><Check className="mt-1 mr-1 w-6 h-6" color="green" /> Patient has been added successfully!</p>)}
            {serverMessage && (<p className="flex w-full mb-5 text-sm font-bold vBox errBox">Something went wrong!</p>)}
            <FieldErrorMessages errors={formError} />
            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="name" className="mb-1">
                        Patient Name<sup>*</sup>
                    </Label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} autoComplete="off" placeholder="Patient Name" disabled={isSubmitting} />
                        )}
                    />
                    {errors.name && <span className="err text-[12px]">{errors.name.message}</span>}
                </div>
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Personal Health Number <sup>*</sup>
                    </Label>
                    <Controller
                        name="personal_health_number"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} autoComplete="off" placeholder="Personal Health Number" disabled={isSubmitting} />
                        )}
                    />
                    {errors.personal_health_number && <span className="err text-[12px]">{errors.personal_health_number.message}</span>}
                </div>

                <div className="inline w-[14%] items-center gap-1.5">
                    <Label htmlFor="age" className="mb-1">Age</Label>
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} autoComplete="off" type="number" min={0} placeholder="Age" disabled={isSubmitting} />
                        )}
                    />
                    {errors.age && <span className="err text-[12px]">{errors.age.message}</span>}
                </div>
                <div className="inline  w-[17%] items-center gap-1.5">
                    <Label htmlFor="contact_number" className="mb-1">Contact Number</Label>
                    <Controller
                        name="contact_number"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Contact Number" disabled={isSubmitting} />
                        )}
                    />
                    {errors.contact_number && <span className="err text-[12px]">{errors.contact_number.message}</span>}
                </div>


                <div className="inline w-[12%] items-center gap-1.5">
                    <Label htmlFor="gender" className="mb-1">Gender <sup>*</sup></Label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value !== undefined ? String(field.value) : ""}
                                onValueChange={(value) => field.onChange(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{ "id": "M", "name": "Male" }, { "id": "F", "name": "Female" }, { "id": "T", "name": "Transgender" }].map((item, idx) => (
                                        <SelectItem key={idx} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting}
                    ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {(isSubmitting) ? "just a moment..." : "Add Patient"}
            </Button>
        </form>
    )
}