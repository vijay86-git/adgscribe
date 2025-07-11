'use client'
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { z } from 'zod';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { HelpCircle, Loader2, Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { clinicProfileMandatoryFormSchema } from "@/schemas/clinic-profile-mandatory-schema";

import { MultiSelect } from "@/components/multi-select";

type MetaCol1 = {
    id: string;
    name: string;
};

type ClinicType = {
    clinic_name: string;
    clinic_logo?: string;
    upload_clinic_logo?: File | null;
    street_address: string;
    city: string;
    state: string;
    zip_code: number;
    country: string;
    gst_no: string;
    patient_id_prefix: string;
    no_of_doctors?: number;
    daily_monthly_patient_footfall?: number;
    designation?: string;
    website_clinic_url?: string;
    year_establishment?: string;
    ai_filter?: string;
};

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type FormData = z.infer<typeof clinicProfileMandatoryFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;

export default function Basic({ countries, clinic_detail }: { countries: MetaCol1[], clinic_detail: ClinicType }) {

    const { clinic_name, country, state, city, street_address, patient_id_prefix, clinic_logo, upload_clinic_logo = null } = clinic_detail;

    const [formError, setFormErrors] = useState<FormErrors>({});
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [msg, setMsg] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    const [formData, setFormData] = useState<FormData>({ clinic_name, country, state, city, street_address, patient_id_prefix, upload_clinic_logo });
    const [countrySearch, setCountrySearch] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false)
    //const [value, setValue] = React.useState("")
    // 39 - canada

    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

    const validateForm = (data: FormData): FormErrors => {

        try {
            clinicProfileMandatoryFormSchema.parse(data);
            return {};
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.flatten().fieldErrors;
            }
            return {};
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, upload_clinic_logo: file }));
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        console.log(Object.keys(newErrors).length, newErrors);

        if (Object.keys(newErrors).length === 0) {

            setFormErrors({});

            try {
                setServerMessage('');
                setIsSubmitting(true);

                const frmData = new FormData();
                frmData.append('clinic_name', formData.clinic_name);
                frmData.append('country', formData.country);
                frmData.append('state', formData.state);
                frmData.append('city', formData.city);
                frmData.append('street_address', formData.street_address);
                frmData.append('patient_id_prefix', formData.patient_id_prefix);

                if (formData.upload_clinic_logo) {
                    frmData.append("upload_clinic_logo", formData.upload_clinic_logo);
                }

                const res = await fetch(`/api/clinic/basic`, {
                    method: "POST",
                    body: frmData,
                });

                const data = await res.json();
                setIsSubmitting(false);

                console.log(data, 'data');
                return;
                if (data.success) {
                    //setUpdateMsg(true);
                }

                if (data?.msg?.errors) {
                    setFormErrors(data.msg.errors);
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
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle><sup>*</sup> (required fields)</CardTitle>
            </CardHeader>
            <CardContent className="grid">
                <section className="container">
                    <form onSubmit={handleSubmit} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_name">Clinic Name<sup>*</sup></Label>
                                <Input type="text" id="clinic_name" name="clinic_name" placeholder="Clinic Name" onChange={handleChange} value={formData.clinic_name} />
                                {errors.clinic_name && (
                                    <p className="text-red-500 text-xs">{errors.clinic_name[0]}</p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="country">Country<sup>*</sup></Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="justify-between"
                                        >
                                            {formData.country
                                                ? countries.find((country) => String(country.id) === String(formData.country))?.name
                                                : "Select Country..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search country..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No Country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase())).map((country) => (
                                                        <CommandItem
                                                            key={String(country.id)}
                                                            value={String(country.name)}
                                                            onSelect={(selected) => {
                                                                const cid: string = String(countries.find((c) => c.name === selected)?.id ?? "");

                                                                console.log(cid);
                                                                //setValue(currentValue === value ? "" : currentValue)

                                                                setFormData((prev) => ({ ...prev, country: cid }));
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {country.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    String(formData.country) == String(country.id) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.country && (
                                    <p className="text-red-500 text-xs">{errors.country[0]}</p>
                                )}

                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="state">State/Province <sup>*</sup></Label>
                                <Input type="text" id="state" name="state" placeholder="State/Province" onChange={handleChange} value={formData.state} />
                                {errors.state && (
                                    <p className="text-red-500 text-xs">{errors.state[0]}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="city">City<sup>*</sup></Label>
                                <Input type="text" id="city" name="city" placeholder="City" onChange={handleChange} value={formData.city} />
                                {errors.city && (
                                    <p className="text-red-500 text-xs">{errors.city[0]}</p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="street_address">Street Address<sup>*</sup></Label>
                                <Input type="text" id="street_address" name="street_address" placeholder="Street Address" onChange={handleChange} value={formData.street_address} />
                                {errors.street_address && (
                                    <p className="text-red-500 text-xs">{errors.street_address[0]}</p>
                                )}
                            </div>
                            <div className="relative grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="patient_id_prefix">
                                    Patient ID Prefix<sup>*</sup>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="absolute right-2 top-1 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>This is a tooltip</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>
                                <Input type="text" id="patient_id_prefix" name="patient_id_prefix" placeholder="Patient ID Prefix" onChange={handleChange} value={formData.patient_id_prefix} />
                                {errors.patient_id_prefix && (
                                    <p className="text-red-500 text-xs">{errors.patient_id_prefix[0]}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 mb-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_logo">Clinic Logo<sup>*</sup></Label>
                                <Input id="image" type="file" name="upload_clinic_logo" accept="image/*" onChange={handleImageChange} />

                                {clinic_logo && (<Image alt="" width={120} height={0} layout="intrinsic" src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${clinic_logo}`} />)}

                                {errors.upload_clinic_logo && (
                                    <p className="text-red-500 text-xs">{errors.upload_clinic_logo[0]}</p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                            </div>
                        </div>

                        <div className="flex gap-3"><Button className="mt-3" disabled={isSubmitting}>Save Changes</Button></div>
                    </form>
                </section>
            </CardContent>
        </Card>
    )
}
