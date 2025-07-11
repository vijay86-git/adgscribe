export type MetaCol = {
    id: string;
    name: string;
};

export type Specialization = {
    value: string;
    label: string;
};


export type MetaDataType = {
    countries: MetaCol[];
    designations: MetaCol[];
    specializations: Specialization[];
};

export type ClinicType = {
    clinic_name: string;
    clinic_logo?: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: number;
    country: string;
    gst_no: string;
    patient_id_prefix: string;
    image?: string;
    no_of_doctors?: number;
    daily_monthly_patient_footfall?: number;
    designation?: string;
    website_clinic_url?: string;
    year_establishment?: string;
    ai_filter?: string;
};