'use client'

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Check } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { MultiSelect } from "@/components/multi-select";

import { ClinicOptionalProps, FormValidationErrors } from "@/components/clinic/Types";

import { updateClinicBusinessDetails } from "@/app/actions"

import { clinicProfileOptionalSchema, ClinicProfileOptionalSchema } from "@/schemas/clinicProfileOptionalSchema"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Optional({ designations, specializations, clinic_detail }: ClinicOptionalProps) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<string>("");
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(clinic_detail.specializations ?? []);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<ClinicProfileOptionalSchema>({
        resolver: zodResolver(clinicProfileOptionalSchema),
        defaultValues: {
            no_of_doctors: clinic_detail?.no_of_doctors || 0,
            daily_monthly_patient_footfall: clinic_detail?.daily_monthly_patient_footfall || 0,
            designation: clinic_detail?.designation || 0,
            specializations: clinic_detail?.specializations || [],
            website_clinic_url: clinic_detail?.website_clinic_url || "",
            year_establishment: clinic_detail?.year_establishment || 0,
            ai_filter: clinic_detail?.ai_filter || 0
        },// Connects Zod schema to React Hook Form
    });

    // When clinic_detail changes, update form values
    useEffect(() => {
        if (clinic_detail) {
            setValue("no_of_doctors", clinic_detail.no_of_doctors || 0);
            setValue("daily_monthly_patient_footfall", clinic_detail.daily_monthly_patient_footfall || 0);
            setValue("designation", clinic_detail.designation || 0);
            setValue("specializations", clinic_detail.specializations || []);
            setValue("website_clinic_url", clinic_detail.website_clinic_url || "");
            setValue("year_establishment", clinic_detail.year_establishment || 0);
            setValue("ai_filter", clinic_detail.ai_filter || 0);
        }
    }, [clinic_detail, setValue]);

    const onSubmit = async (data: ClinicProfileOptionalSchema) => {
        // convert data to formData
        setIsSubmitting(true);
        setUpdateMsg(false);
        const resp = await updateClinicBusinessDetails(data);
        setIsSubmitting(false);
        setFormErrors({});
        setUpdateMsg(false);
        if (resp.response == "OK") {
            setUpdateMsg(true);
        }
        else if (resp.response == "VALIDATION") {
            setFormErrors(resp.msg);
        } else {
            //setServerMessage(true);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Optional (but recommended)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <section className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-100 rounded-lg p-4">
                        {updateMsg && (<p className="flex w-full mb-5 text-sm font-bold vBox sucBox"><Check className="mt-1 mr-1 w-6 h-6" color="green" /> Updated successfully!</p>)}
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="no_of_doctors">Number of Doctors</Label>
                                <Controller
                                    name="no_of_doctors"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} type="number" min="0" placeholder="Number of Doctors" disabled={isloading || isSubmitting} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))} />
                                    )}
                                />
                                {errors.no_of_doctors && (
                                    <p className="text-red-500 text-xs">{errors.no_of_doctors.message}</p>
                                )}

                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="daily_monthly_patient_footfall">Daily/Monthly Patient Footfall</Label>
                                <Controller
                                    name="daily_monthly_patient_footfall"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Daily/Monthly Patient Footfall" disabled={isloading || isSubmitting} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))} />
                                    )}

                                />
                                {errors.daily_monthly_patient_footfall && (
                                    <p className="text-red-500 text-xs">{errors.daily_monthly_patient_footfall.message}</p>
                                )}

                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_specializations">Clinic Specializations</Label>

                                <Controller
                                    name="specializations"
                                    control={control}
                                    render={({ field }) => (
                                        <MultiSelect
                                            options={specializations}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="Select Specializations"
                                            variant="inverted"
                                            maxCount={1}
                                        />
                                    )}
                                />
                                {/* <MultiSelect
                                    options={specializations}
                                    onValueChange={setSelectedSpecializations}
                                    defaultValue={selectedSpecializations}
                                    placeholder="Select Specializations"
                                    variant="inverted"
                                    maxCount={1}
                                /> */}

                                {errors.specializations && (
                                    <p className="text-red-500 text-xs">{errors.specializations.message}</p>
                                )}

                            </div>
                        </div>

                        <div className="flex gap-3 mb-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="designation">Designation/Role</Label>

                                <Controller
                                    name="designation"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value !== undefined ? String(field.value) : ""}
                                            onValueChange={(value) => field.onChange(Number(value))}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a designation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {designations.map((item, idx) => (
                                                    <SelectItem key={idx} value={item.id}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.designation && (
                                    <p className="text-red-500 text-xs">{errors.designation.message}</p>
                                )}
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="website_clinic_url">Website or Clinic URL <sup>*</sup></Label>
                                <Controller
                                    name="website_clinic_url"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Website or Clinic URL" disabled={isloading || isSubmitting} />
                                    )}
                                />
                                {errors.website_clinic_url && (
                                    <p className="text-red-500 text-xs">{errors.website_clinic_url.message}</p>
                                )}
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="year_establishment">Year of Establishment</Label>
                                <Controller
                                    name="year_establishment"
                                    control={control}
                                    render={({ field }) => (
                                        <Select value={field.value !== undefined ? String(field.value) : ""}
                                            onValueChange={(value) => field.onChange(Number(value))}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Year of Establishment" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 101 }, (_, i) => {
                                                    const year = String(new Date().getFullYear() - i);
                                                    return (
                                                        <SelectItem key={year} value={year}>
                                                            {year}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.year_establishment && (
                                    <p className="text-red-500 text-xs">{errors.year_establishment.message}</p>
                                )}
                            </div>

                        </div>

                        <div className="flex gap-3"><Button className="mt-3">Save Changes</Button></div>

                    </form>
                </section>
            </CardContent>
        </Card >
    )
}
