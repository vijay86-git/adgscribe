import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ClinicProfileMandatoryFormSchema } from "@/schemas/clinicProfileMandatorySchema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFormData(data: ClinicProfileMandatoryFormSchema) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      if (value.size > 0) {
        formData.append(key, value); // for files
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value)); // for strings/numbers/booleans
    }
  });
  return formData;
}