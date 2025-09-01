import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { storePatientDetails } from "@/app/actions"
import { Search, UserPlus, Loader2 } from "lucide-react";
import { SearchPatient, PatientType } from '@/components/patient/Types'
import { useForm, Controller } from "react-hook-form";

type Props = {
    open: boolean,
    isPatient: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    fetchPatient: React.Dispatch<React.SetStateAction<boolean>>,
    user: SearchPatient;
    setUser: React.Dispatch<React.SetStateAction<SearchPatient>>;
};

import { patientProfileFormSchema, PatientProfileFormSchema } from "@/schemas/patientProfileSchema";
import { patientFormData } from "@/lib/utils"
import { FormValidationErrors } from "@/lib/types"

const handleGenderChange = (value: string) => {
    console.log(value);
}

export default function SearchAddPatientModal({ open, setOpen, user, setUser, isPatient, fetchPatient }: Props) {

    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState<PatientType[]>([]);
    const [submitting, setIsSubmitting] = useState<boolean>(false);
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelected(false); // re-enable API call only if user is typing
    };

    const handleSelect = (item: PatientType) => {
        const { patient_name, personal_health_number, uuid, contact_number } = item;
        setQuery('');         // update input with selected value
        setSelected(true);      // prevent another API call
        setShowDropdown(false); // hide dropdown
        setOpen(false);
        setUser({ ...user, label: patient_name, personal_health_number, uuid, phone: contact_number });
        fetchPatient(true);
    };

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PatientProfileFormSchema>({
        resolver: zodResolver(patientProfileFormSchema),
        defaultValues: {
            name: "",
            personal_health_number: "",
            age: 0,
            contact_number: "",
        },// Connects Zod schema to React Hook Form
    });

    useEffect(() => {
        if (!query.trim() || selected) return;

        const timeoutId = setTimeout(() => {
            setLoading(true);
            fetch(`http://127.0.0.1:8001/api/v1/patients`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ q: encodeURIComponent(query) })
            })
                .then((res) => res.json())
                .then((data) => {
                    setResults(data.patients); // assuming { results: [] }
                    setShowDropdown(true);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Autocomplete error:", err);
                    setLoading(false);
                });
        }, 300); // debounce

        return () => clearTimeout(timeoutId); // cancel on new keystroke
    }, [query, selected]);

    const onSubmit = async (data: PatientProfileFormSchema) => {

        const formData = patientFormData(data); // convert data to formData
        console.log(formData);
        setIsSubmitting(true);
        //setUpdateMsg(false);
        const resp = await storePatientDetails(formData);
        setIsSubmitting(false);
        setFormErrors({});
        //setUpdateMsg(false);
        if (resp.response == "OK") {
            //setUpdateMsg(true);
        }
        else if (resp.response == "VALIDATION") {
            setFormErrors(resp.msg);
        } else {
            //setServerMessage(true);
        }
    }

    return (<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="ml-4 flex items-center tracking-wide gap-2 bg-[#0f172a] text-white text-sm font-bold px-4 py-2 rounded-full shadow">
                <Search /> Search or Add Patient
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl w-full md:max-w-4xl lg:max-w-4xl">
            <DialogHeader>
                <DialogTitle>Search / Add New Patient</DialogTitle>
                <DialogDescription>
                    Search existing patients or add a new one by filling in the details below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-gray-100 rounded-lg p-4">
                <div className="grid gap-4">
                    <div>
                        <Input
                            value={query}
                            onChange={handleChange}
                            onFocus={() => !selected && query && setShowDropdown(true)}
                            placeholder="Search Patient by Name, Contact Number..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {loading && <div className="top-full mt-2 text-sm text-gray-500"><Loader2 className="animate-spin" size={16} color="#333" /></div>}
                        {showDropdown && results.length > 0 && (
                            <ul className="absolute z-10 w-[95%] mt-1 bg-white border rounded-md max-h-60 overflow-y-auto">
                                {results.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleSelect(item)}
                                    >
                                        {item.patient_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex items-center justify-center m-5 space-x-4 w-[95%]">
                        <div className="flex-grow border-t border-dashed border-gray-400"></div>
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
                            OR
                        </div>
                        <div className="flex-grow border-t border-dashed border-gray-400"></div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Patient Name *" />
                                )}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col w-[250]">

                            <Controller
                                name="personal_health_number"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Personal Health Number *" />
                                )}
                            />

                            {errors.personal_health_number && (
                                <p className="text-red-500 text-xs">{errors.personal_health_number.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col w-[80]">

                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Age" type="number" min="0" onChange={(e) => field.onChange(Number(e.target.value))} />
                                )}
                            />

                            {errors.age && (
                                <p className="text-red-500 text-xs">{errors.age.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col">

                            <Controller
                                name="contact_number"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Contact Number" />
                                )}
                            />

                            {errors.contact_number && (
                                <p className="text-red-500 text-xs">{errors.contact_number.message}</p>
                            )}

                        </div>

                        <div className="flex flex-col">
                            <Select onValueChange={handleGenderChange}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        <UserPlus size={24} /> Add Patient
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog >)
}