import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ClinicProfileMandatoryFormSchema } from "@/schemas/clinicProfileMandatorySchema";
import { PatientProfileFormSchema } from "@/schemas/patientProfileSchema";
//import { getPlaiceholder } from 'plaiceholder';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*export function toFormData(data: ClinicProfileMandatoryFormSchema) {
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
*/

export function toFormData(data: ClinicProfileMandatoryFormSchema): FormData {
  const formData = new FormData();
  appendFormDataEntries(formData, data);
  return formData;
}

function appendFormDataEntries(formData: FormData, data: Record<string, any>) {
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      if (value.size > 0) {
        formData.append(key, value); // for files
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value)); // for strings/numbers/booleans
    }
  });
}

export function patientFormData(data: PatientProfileFormSchema): FormData {
  const formData = new FormData();
  appendFormDataEntries(formData, data);
  return formData;
}



// export async function getImageProps(src: string) {
//   const buffer = await fetch(src).then(async (res) =>
//     Buffer.from(await res.arrayBuffer())
//   );
//   const { base64, metadata: { height, width } } = await getPlaiceholder(Buffer.from(buffer));
//   //const img = { src, height, width };
//   return {
//     base64, // 👈 this is your blurDataURL
//     src,
//     width,
//     height
//   };
// }