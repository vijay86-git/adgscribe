'use server'
import { SignInFormData } from "@/schemas/formSchemas";
import { createSession, decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { SearchRequestBody } from '@/components/doctors/Types';
import { UserProfileFormSchema } from "@/schemas/userProfileSchema";
import { ClinicProfileOptionalSchema } from "@/schemas/clinicProfileOptionalSchema";
import { TemplateFormSchema } from "@/schemas/templateSchema";

export const getBearToken = async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    return session?.token;
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit
): Promise<T> {

    const defaultHeaders: Record<string, string> = {};

    // Only add Content-Type if not FormData
    if (!(options.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

    console.log("process.env.NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

    console.log("yy888");

    console.log({
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

    const response: Response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

    console.log(response.status, 'response.status');
    console.log(response, 'response.status');


    if (response.status === 401 || response.status === 422) {
        return response as T;
    }

    if (!response.ok) {
        // You can handle HTTP errors here if you want
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response as T;
}

export async function signin(formData: SignInFormData) {

    try {
        const resp: Response = await apiFetch(`/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        console.log(resp, 'resp');
        if (resp.ok) {
            const data = await resp.json();
            console.log(data, "data");
            await createSession(data.access_token);
            return { success: true };
        } else {
            const msg = await resp.json();
            return { success: false, msg };
        }
    } catch {
        return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function getDoctors(body: SearchRequestBody) {

    try {
        const resp: Response = await apiFetch(`/doctors`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${await getBearToken()}`
            },
        });

        if (resp.ok) {
            const data = await resp.json();
            return { success: true, res: data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function getPatients(body: SearchRequestBody) {
    try {
        const resp: Response = await apiFetch(`/patients`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, res: data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function getHistories(body: SearchRequestBody) {
    try {
        const resp: Response = await apiFetch(`/history`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, res: data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function getLogs(body: SearchRequestBody) {
    try {
        const resp: Response = await apiFetch(`/logs`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, res: data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function metaData() {
    try {
        const resp: Response = await apiFetch(`/metadata`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            //return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        //return { success: false, msg: { message: "Something went wrong! Try again" } };
    }
}

export async function updateProfile(formData: UserProfileFormSchema) {
    try {
        const resp: Response = await apiFetch(`/user/profile`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        const response = await resp.json();
        if (resp.ok) {
            return { response: "OK" };
        } else {
            return { response: "VALIDATION", msg: response.errors };
        }
    } catch {
        return { success: false, msg: "Something went wrong! Try again" }
    };
}

export async function getUserDetail() {
    try {
        const resp: Response = await apiFetch(`/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: "Something went wrong! Try again" }
    };
}

export async function getClinicDetails() {
    try {
        const resp: Response = await apiFetch(`/clinic-details`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            return await resp.json();
        } else {
            //return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        //return { success: false, msg: "Something went wrong! Try again" }
    };
}


export async function updateClinincMandatoryDetails(formData: FormData) {

    try {
        const resp: Response = await apiFetch(`/update-clinic-basic-details`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        const response = await resp.json();
        if (resp.ok) {
            return { response: "OK", logo: response.logo };
        } else {
            return { response: "VALIDATION", msg: response.errors };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };

}

export async function updateClinicBusinessDetails(data: ClinicProfileOptionalSchema) {

    try {
        const resp: Response = await apiFetch(`/update-clinic-business-details`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        const response = await resp.json();
        if (resp.ok) {
            return { response: "OK", logo: response.logo };
        } else {
            return { response: "VALIDATION", msg: response.errors };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };

}


export async function getTemplates(body: SearchRequestBody) {
    try {
        const resp: Response = await apiFetch(`/my-templates`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, res: data };
        } else {
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };
}

export async function templateStore(data: TemplateFormSchema) {

    try {
        const resp: Response = await apiFetch(`/templates`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });
        if (resp.ok) {
            return { response: "OK" };
        } else {
            const response = await resp.json();
            return { response: "VALIDATION", msg: response.errors };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };
}

export async function generateTranscript(filename: string) {

    try {
        const resp: Response = await apiFetch(`/transcribe`, {
            method: 'POST',
            body: JSON.stringify({ filename }),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });

        if (resp.ok) {
            const data = await resp.json();
            return { response: "OK", data };
        } else {
            return { response: "ERROR", msg: "Something went wrong! Try again" };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };
}

export async function generateNotes(uuid: string) {
    try {
        const resp: Response = await apiFetch(`/generate`, {
            method: 'POST',
            body: JSON.stringify({ uuid }),
            headers: {
                Authorization: `Bearer ${await getBearToken()}`
            },
        });

        if (resp.ok) {
            const data: {
                status: string;
                response: string;
            } = await resp.json();
            const { status, response } = data;
            return { status, response };
        } else {
            return { response: "ERROR", msg: "Something went wrong! Try again" };
        }
    } catch {
        return { response: "ERROR", msg: "Something went wrong! Try again" }
    };
}


// export async function upload(file: any) {

//     //const formData = await req.formData();

//     // const res =  await apiFetch(apiRoutes.auth.profile, {
//     //   	method: 'POST',
//     //   	body: JSON.stringify({}),
//     //   	headers: {
//     // 	    Authorization: `Bearer ${token}`
//     // 	},
//     // });

//     const formData = new FormData();
//     formData.append("audio_file", file);

//     // Show progress UI
//     //$("#upload-progress-container").show();
//     //$("#upload-progress-bar").css("width", "0%").text("0%");

//     try {
//         const response: any = await fetch(`/upload`, {
//             method: "POST",
//             body: formData,
//             headers: {
//                 Authorization: `Bearer ${await getBearToken()}`
//             },
//         });

//         // const response: any = await fetch(`/upload`, {
//         //     method: "GET"
//         // });

//         // if (!response.ok) {
//         //     const errorText = await response.text();
//         //     alert("Upload failed: " + errorText);
//         //     return;
//         // }

//         // const data = await response.json();

//         // // Show success UI
//         // const uploadedFilename = data.filename;

//         //console.log(data);


//         //$("#uploaded-name").text(data.filename);
//         //switchStep(2);


//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", `${process.env.NEXT_PUBLIC_API_BASE_URL}upload`, true);

//         // Type for event argument in progress event
//         xhr.upload.addEventListener("progress", (e: ProgressEvent) => {
//             if (e.lengthComputable) {
//                 const percent = Math.round((e.loaded / e.total) * 100);
//                 updateProgress(percent);
//             }
//         });

//         xhr.onload = function (): void {
//             if (xhr.status === 200) {
//                 const response = JSON.parse(xhr.responseText);
//                 const uploadedFilename: string = response.filename;
//                 //$("#uploaded-name").text(uploadedFilename);
//                 //switchStep(2);
//             } else {
//                 alert("Upload failed: " + xhr.responseText);
//             }
//         };

//         xhr.onerror = function (): void {
//             alert("Upload failed due to network error.");
//         };

//         // Show progress bar container before upload
//         // $("#upload-progress-container").show();
//         // $("#upload-progress-bar").css("width", "0%").text("0%");

//         xhr.send(formData);

//     } catch (error) {
//         alert("Upload failed due to network error.");
//         console.error(error);
//     }