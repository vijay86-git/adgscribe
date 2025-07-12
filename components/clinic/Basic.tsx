'use client'
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { z } from 'zod';

import {
    Card,
    CardContent,
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

import { HelpCircle, Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { clinicProfileMandatoryFormSchema, ClinicProfileMandatoryFormSchema } from "@/schemas/clinicProfileMandatorySchema";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ClinicCountryProps } from "@/components/clinic/Types"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// type MetaCol1 = {
//     id: string;
//     name: string;
// };

// type ClinicType = {
//     clinic_name: string;
//     clinic_logo?: string;
//     upload_clinic_logo?: File | null;
//     street_address: string;
//     city: string;
//     state: string;
//     zip_code: number;
//     country: string;
//     gst_no: string;
//     patient_id_prefix: string;
//     no_of_doctors?: number;
//     daily_monthly_patient_footfall?: number;
//     designation?: string;
//     website_clinic_url?: string;
//     year_establishment?: string;
//     ai_filter?: string;
// };


//type FormData = z.infer<typeof clinicProfileMandatoryFormSchema>;
//type FormErrors = Partial<Record<keyof FormData, string[]>>;

export default function Basic({ countries, clinic_detail }: ClinicCountryProps) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<string>("");
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [countrySearch, setCountrySearch] = useState<string>("");

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<ClinicProfileMandatoryFormSchema>({
        resolver: zodResolver(clinicProfileMandatoryFormSchema),
        defaultValues: {
            clinic_name: "",
            street_address: "",
            city: "",
            state: "",
            country: "",
            patient_id_prefix: ""
        },// Connects Zod schema to React Hook Form
    });


    // When clinic_detail changes, update form values
    useEffect(() => {
        if (clinic_detail) {
            setValue("clinic_name", clinic_detail.clinic_name || "");
            setValue("street_address", clinic_detail.street_address || "");
            setValue("city", clinic_detail.city || "");
            setValue("state", clinic_detail.state || "");
            setValue("country", clinic_detail.country || "");
            //setValue("zip_code", clinic_detail.zip_code || 0);
            setValue("patient_id_prefix", clinic_detail.patient_id_prefix || "");
            //setValue("clinic_logo", clinic_detail.clinic_logo || "");
        }
    }, [clinic_detail, setValue]);


    const onSubmit = async (data: ClinicProfileMandatoryFormSchema) => {
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




    // const { clinic_name, country, state, city, street_address, patient_id_prefix, clinic_logo, upload_clinic_logo = null } = clinic_detail;

    //const [formError, setFormErrors] = useState<FormErrors>({});
    //const [errors, setErrors] = useState<FormErrors>({});
    // const [loading, setLoading] = useState<boolean>(true);
    // const [msg, setMsg] = useState<boolean>(false);
    // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    // const [serverMessage, setServerMessage] = useState<string>("");
    // const [formData, setFormData] = useState<ClinicProfileMandatoryFormSchema>({ clinic_name, country, state, city, street_address, patient_id_prefix, upload_clinic_logo });
    // const [countrySearch, setCountrySearch] = useState<string>("");
    // const [open, setOpen] = useState<boolean>(false)
    // //const [value, setValue] = React.useState("")
    // // 39 - canada

    // const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);


    // const {
    //     handleSubmit,
    //     control,
    //     setValue,
    //     formState: { errors },
    // } = useForm<ClinicProfileMandatoryFormSchema>({
    //     resolver: zodResolver(ClinicProfileMandatoryFormSchema),
    //     defaultValues: {
    //         name: "",
    //         email: "",
    //         password: "",
    //         confirm_password: ""
    //     },// Connects Zod schema to React Hook Form
    // });



    // const validateForm = (data: FormData): FormErrors => {

    //     try {
    //         clinicProfileMandatoryFormSchema.parse(data);
    //         return {};
    //     } catch (error) {
    //         if (error instanceof z.ZodError) {
    //             return error.flatten().fieldErrors;
    //         }
    //         return {};
    //     }
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setFormData((prev) => ({ ...prev, upload_clinic_logo: file }));
    //     }
    // };

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();

    //     const newErrors = validateForm(formData);
    //     setErrors(newErrors);

    //     console.log(Object.keys(newErrors).length, newErrors);

    //     if (Object.keys(newErrors).length === 0) {

    //         setFormErrors({});

    //         try {
    //             setServerMessage('');
    //             setIsSubmitting(true);

    //             const frmData = new FormData();
    //             frmData.append('clinic_name', formData.clinic_name);
    //             frmData.append('country', formData.country);
    //             frmData.append('state', formData.state);
    //             frmData.append('city', formData.city);
    //             frmData.append('street_address', formData.street_address);
    //             frmData.append('patient_id_prefix', formData.patient_id_prefix);

    //             if (formData.upload_clinic_logo) {
    //                 frmData.append("upload_clinic_logo", formData.upload_clinic_logo);
    //             }

    //             const res = await fetch(`/api/clinic/basic`, {
    //                 method: "POST",
    //                 body: frmData,
    //             });

    //             const data = await res.json();
    //             setIsSubmitting(false);

    //             console.log(data, 'data');
    //             return;
    //             if (data.success) {
    //                 //setUpdateMsg(true);
    //             }

    //             if (data?.msg?.errors) {
    //                 setFormErrors(data.msg.errors);
    //             }

    //             if (data?.msg?.message) {
    //                 setServerMessage(data.msg.message);
    //             }

    //         } catch (err: unknown) {
    //             setIsSubmitting(false);
    //             if (err instanceof Error) {
    //                 setServerMessage(err.message); // // works, `e` narrowed to string
    //             } else if (e instanceof Error) {
    //                 setServerMessage("Oops! Something went wrong"); // works, `e` narrowed to Error
    //             }
    //         }
    //     }
    // }

    return (
        <Card>
            <CardHeader>
                <CardTitle><sup>*</sup> (required fields)</CardTitle>
            </CardHeader>
            <CardContent className="grid">
                <section className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_name">Clinic Name<sup>*</sup></Label>
                                <Controller
                                    name="clinic_name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Name" disabled={isloading || isSubmitting} />
                                    )}
                                />
                                {errors.clinic_name && (
                                    <p className="text-red-500 text-xs">{errors.clinic_name.message}</p>
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
                                            {clinic_detail.country
                                                ? countries.find((country) => String(country.id) === String(clinic_detail.country))?.name
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

                                                                //setFormData((prev) => ({ ...prev, country: cid }));
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {country.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    String(clinic_detail.country) == String(country.id) ? "opacity-100" : "opacity-0"
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
                                    <p className="text-red-500 text-xs">{errors.country.message}</p>
                                )}

                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="state">State/Province <sup>*</sup></Label>
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="State" disabled={isloading || isSubmitting} />
                                    )}
                                />
                                {errors.state && (
                                    <p className="text-red-500 text-xs">{errors.state.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 mb-6">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="city">City<sup>*</sup></Label>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="City" disabled={isloading || isSubmitting} />
                                    )}
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-xs">{errors.city.message}</p>
                                )}
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="street_address">Street Address<sup>*</sup></Label>

                                <Controller
                                    name="street_address"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Street Address" disabled={isloading || isSubmitting} />
                                    )}
                                />
                                {errors.street_address && (
                                    <p className="text-red-500 text-xs">{errors.street_address.message}</p>
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
                                <Controller
                                    name="patient_id_prefix"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} placeholder="Patient Id Prefix" disabled={isloading || isSubmitting} />
                                    )}
                                />

                                {errors.patient_id_prefix && (
                                    <p className="text-red-500 text-xs">{errors.patient_id_prefix.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 mb-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="clinic_logo">Clinic Logo<sup>*</sup></Label>

                                <Controller
                                    name="upload_clinic_logo"
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} onChange={(e) => field.onChange(e.target.files)} type="file" accept="image/*" placeholder="Upload Logo" disabled={isloading || isSubmitting} />
                                    )}
                                />

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
