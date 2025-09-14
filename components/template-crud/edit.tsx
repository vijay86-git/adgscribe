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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { FormValidationErrors } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea";
import html2md from 'html-to-md'

export default function Edit() {

    const router = useRouter(); // ✅ Called at the top level

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    //const [isloading, setIsLoading] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<boolean>(false);
    const [updateMsg, setUpdateMsg] = useState<boolean>(false);
    const [formError, setFormErrors] = useState<FormValidationErrors>({});

    const [type, setType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [markdown, setMarkDown] = useState<string>("");

    const isloading: boolean = false;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TemplateFormSchema>({
        resolver: zodResolver(templateFormSchema),
        defaultValues: {
            name: "",
            template: "",
        },// Connects Zod schema to React Hook Form
    });




    const onSubmit = async (data: TemplateFormSchema) => {

        html2md('<strong><em>strong and italic</em></strong>', options, force)

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
                      autocomplete="off"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Paste Html Or Type..."
                          className="h-50"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // keep React Hook Form state in sync
                            const html = `<div>${e.target.value}</div>`;
                            const converted = html2md(html, {
                              skipTags: ['div', 'html', 'body', 'nav', 'section', 'footer', 'main', 'aside', 'article', 'header'],
                              emptyTags: [],
                              ignoreTags: ['style', 'head', '!doctype', 'form', 'svg', 'noscript', 'script', 'meta'],
                              renderCustomTags: true,
                              syncScroll: true, // (note: library expects `syncScroll`, not `syncscroll`)
                              rules: {
                                br: {
                                  filter: ['br'],
                                  replacement: () => '\n\n', // add newline for <br/>
                                },
                                p: {
                                  filter: ['p'],
                                  replacement: (content) => `${content}\n\n`, // add blank line for paragraphs
                                },
                              },
                            });

                            console.log(converted); 

                            setMarkDown(converted);
                          }}
                        />
                      )}
                    />
                            
                    {errors.template && <span className="err text-sm">{errors.template.message}</span>}
                </div>
            </div>


            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Markdown
                    </Label>
                     <Controller
                      name="template"
                      control={control}
                      render={({ field }) => (
                            <Textarea
                              placeholder="AutoGenerate"
                              readonly
                              disabled
                              className="h-50"
                              {...field}
                              value={markdown}
                            />
                        )}
                    />

                </div>
            </div>

            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Type<sup>*</sup>
                    </Label>
                    <Select value={type} onValueChange={(value) => setType(value)}>
                        <SelectTrigger className="w-full min-h-[3rem] py-4 text-gray-900">
                            <SelectValue className="text-gray-900" placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-gray-900" value="clinical">Clinical</SelectItem>
                            <SelectItem className="text-gray-900" value="patient_facing_summaries">Patient Facing Summaries</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.template && <span className="err text-sm">{errors.template.message}</span>}
                </div>
            </div>

            <div className="flex gap-6 mb-6">
                <div className="flex-1 w-full items-center gap-2.5">
                    <Label htmlFor="email" className="mb-1">
                        Status<sup>*</sup>
                    </Label>
                   <Select value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-full min-h-[3rem] py-4 text-gray-900">
                            <SelectValue className="text-gray-900" placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-gray-900" value="1">Active</SelectItem>
                            <SelectItem className="text-gray-900" value="0">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.status && <span className="err text-sm">{errors.status.message}</span>}
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