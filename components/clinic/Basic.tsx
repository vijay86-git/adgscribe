'use client'
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

import { ClinicCountryProps, FormValidationErrors } from "@/components/clinic/Types"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateClinincMandatoryDetails } from "@/app/actions"

export default function Basic({ countries, clinic_detail }: ClinicCountryProps) {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<boolean>(false);
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [countrySearch, setCountrySearch] = useState<string>("");
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ClinicProfileMandatoryFormSchema>({
        resolver: zodResolver(clinicProfileMandatoryFormSchema),
        defaultValues: {
            clinic_name: "",
            street_address: "",
            city: "",
            state: "",
            country: 0,
            patient_id_prefix: ""
        },// Connects Zod schema to React Hook Form
    });

    const selectedCountryId = watch("country");
    const selectedCountry = countries.find((c) => c.id == selectedCountryId);

    // When clinic_detail changes, update form values
    useEffect(() => {
        setIsLoading(true);
        if (clinic_detail) {
            setValue("clinic_name", clinic_detail.clinic_name || "");
            setValue("street_address", clinic_detail.street_address || "");
            setValue("city", clinic_detail.city || "");
            setValue("state", clinic_detail.state || "");
            setValue("country", clinic_detail.country || 0);
            setValue("patient_id_prefix", clinic_detail.patient_id_prefix || "");
            //setValue("clinic_logo", clinic_detail.clinic_logo || "");
        }
    }, [clinic_detail, setValue]);

    const onSubmit = async (data: ClinicProfileMandatoryFormSchema) => {

        setIsSubmitting(true);
        const resp = await updateClinincMandatoryDetails(data);
        setIsSubmitting(false);
        setFormErrors({});
        setUpdateMsg(false);
        if (resp.response == "OK") {
            setUpdateMsg(true);
        }
        else if (resp.response == "VALIDATION") {
            // setMessage(response.msg.message);
            setFormErrors(resp.msg);
        } else {
            setServerMessage(true);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle><sup>*</sup> (required fields)</CardTitle>
            </CardHeader>
            <CardContent className="grid">
                <section className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-100 rounded-lg p-4">
                        {serverMessage && <span className="errBox text-sm vBox">Someting went wrong</span>}
                        {updateMsg && (<p className="flex w-full mb-5 text-sm font-bold vBox sucBox"><Check className="mt-1 mr-1 w-6 h-6" color="green" /> Your Profile has been updated successfully!</p>)}
                        {Object.entries(formError).map(([field, messages]) => (
                            <div key={field}>
                                <ul className="mb-5">
                                    {messages.map((msg, index) => (
                                        <li className="err text-sm" key={index}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
                                            {selectedCountry ? selectedCountry.name : "Select Country..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search country..." className="h-9" value={countrySearch}
                                                onValueChange={(value) => setCountrySearch(value)} />
                                            <CommandList>
                                                <CommandEmpty>No Country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase())).map((country) => (
                                                        <CommandItem
                                                            key={country.id}
                                                            value={String(country.name)}
                                                            className={(isloading || isSubmitting) ? "pointer-events-none opacity-50" : ""}
                                                            onSelect={(selected) => {
                                                                const cid = Number(countries.find((c) => c.name === selected)?.id ?? 0);
                                                                setValue('country', cid, { shouldValidate: true });
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {country.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    selectedCountry?.id == country.id ? "opacity-100" : "opacity-0"
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
        </Card >
    )
}