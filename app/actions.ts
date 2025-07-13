'use server'
import { SignInFormData } from "@/schemas/formSchemas";
import { createSession } from '@/lib/session'
import { SearchRequestBody } from '@/components/doctors/Types';
import { UserProfileFormSchema } from "@/schemas/userProfileSchema";
import { ClinicProfileMandatoryFormSchema } from "@/schemas/clinicProfileMandatorySchema";
import { ClinicProfileOptionalSchema } from "@/schemas/clinicProfileOptionalSchema";

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

    const response: Response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    });

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
        if (resp.ok) {
            const data = await resp.json();
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
            body: JSON.stringify(body)
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
            body: JSON.stringify(body)
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
            body: JSON.stringify(body)
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
            body: JSON.stringify(body)
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
            method: 'GET'
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
            body: JSON.stringify(formData)
        });
        if (resp.ok) {
            const data = await resp.json();
            return { success: true, data }
        } else {
            console.log(await resp.json());
            return { success: false, msg: "Something went wrong! Try again" };
        }
    } catch {
        return { success: false, msg: "Something went wrong! Try again" }
    };
}

export async function getUserDetail() {
    try {
        const resp: Response = await apiFetch(`/user/profile`, {
            method: 'GET'
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
            method: 'GET'
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
            body: JSON.stringify(data)
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