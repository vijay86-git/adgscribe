'use client'

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from 'zod';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { HelpCircle, Loader2 } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "@/components/multi-select";

type MetaCol = {
    id: string;
    name: string;
};


type CType = {
    no_of_doctors?: number;
    daily_monthly_patient_footfall?: number;
    designation?: string;
    website_clinic_url?: string;
    year_establishment?: string;
    ai_filter?: string;
    specializations?: string[]
};

type Spec = {
    value: string;
    label: string;
};

import { clinicProfileOptionalFormSchema } from "@/schemas/clinic-profile-optional-schema";
type FormData = z.infer<typeof clinicProfileOptionalFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;

export default function Optional({ designations, specializations, clinic_detail }: { designations: MetaCol[], specializations: Spec[], clinic_detail: CType }) {

    const { no_of_doctors, daily_monthly_patient_footfall, designation, website_clinic_url, year_establishment, ai_filter } = clinic_detail;

    const [formData, setFormData] = useState<FormData>({ no_of_doctors, daily_monthly_patient_footfall, designation, website_clinic_url, year_establishment });

    //const [selectedSpecializations, setSelectedSpecializations] = useState<string[] | (() => string[])>(clinic_detail.specializations ?? []);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(clinic_detail.specializations ?? []);

    const [errors, setErrors] = useState<FormErrors>({});

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = (data: FormData): FormErrors => {

        try {
            clinicProfileOptionalFormSchema.parse(data);
            return {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.flatten().fieldErrors;
            }
            return {};
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        /*
          e.preventDefault();
    
          const newErrors = validateForm(formData);
          setErrors(newErrors);
    
          console.log(Object.keys(newErrors).length, newErrors);
    
          if (Object.keys(newErrors).length === 0) {
    
            //setFormErrors({});
    
            try {
                setServerMessage('');
                setIsSubmitting(true);
    
                const res = await fetch(`/api/clinic/optional`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                                        ...formData,
                                        specializations: selectedSpecializations,
                                      })
                });
    
                const data = await res.json();
                setIsSubmitting(false);
    
                if (data.success) {
                    //setUpdateMsg(true);
                } 
    
                if (data?.msg?.errors) {
                   // setFormErrors(data.msg.errors);
                }
    
                if (data?.msg?.message) {
                    setServerMessage(data.msg.message);
                }
    
            } catch (err: unknown) {
              setIsSubmitting(false);
              if (err instanceof Error) {
                setServerMessage(err.message); // // works, `e` narrowed to string
              } else if (e instanceof Error) {
                setServerMessage("Oops! Something went wrong"); // works, `e` narrowed to Error
              }
            }
          }*/
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Optional (but recommended)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <section className="container">
                    <form onSubmit={handleSubmit} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="no_of_doctors">Number of Doctors</Label>
                                <Input type="number" min="0" onChange={handleChange} placeholder="Number of Doctors" name="no_of_doctors" value={formData.no_of_doctors} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="daily_monthly_patient_footfall">Daily/Monthly Patient Footfall</Label>
                                <Input type="number" id="daily_monthly_patient_footfall" onChange={handleChange} placeholder="Daily/Monthly Patient Footfall" name="daily_monthly_patient_footfall" value={formData.daily_monthly_patient_footfall} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_specializations">Clinic Specializations</Label>

                                {/*<MultiSelect
                                  options={specializations}
                                  onValueChange={setSelectedSpecializations}
                                  defaultValue={selectedSpecializations}
                                  placeholder="Select Specializations"
                                  variant="inverted"
                                  maxCount={1}
                                />*/}
                                <MultiSelect
                                    options={specializations}
                                    onValueChange={setSelectedSpecializations}
                                    defaultValue={selectedSpecializations}
                                    placeholder="Select Specializations"
                                    variant="inverted"
                                    maxCount={1}
                                />

                            </div>
                        </div>


                        <div className="flex gap-3 mb-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="designation">Designation/Role</Label>
                                {designations && designations.length > 0 && (
                                    <Select
                                        value={formData.designation}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                designation: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a designation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {designations.map((item, idx) => (
                                                <SelectItem key={idx} value={String(item.id)}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="website_clinic_url">Website or Clinic URL <sup>*</sup></Label>
                                <Input type="text" id="url" onChange={handleChange} placeholder="Website or Clinic URL" name="website_clinic_url" value={formData.website_clinic_url} />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="year_establishment">Year of Establishment</Label>
                                <Select
                                    value={formData.year_establishment}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            year_establishment: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Year of Establishment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 101 }, (_, i) => {
                                            const year = String(new Date().getFullYear() - i);
                                            return (
                                                <SelectItem key={year} value={year}>{year}</SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>



                        </div>

                        <div className="flex gap-3"><Button className="mt-3">Save Changes</Button></div>

                    </form>
                </section>
            </CardContent>
        </Card>
    )
}
