export type MetaCol = {
    id: string;
    name: string;
};

export type Country = {
    id: number;
    name: string;
};

export type Specialization = {
    value: string;
    label: string;
};

export type ClinicMandatory = {
    clinic_name: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: number;
    country: number;
    patient_id_prefix: string;
    clinic_logo?: string;
    upload_clinic_logo?: File | null;
};

export type ClinicBusiness = {
    no_of_doctors?: number;
    daily_monthly_patient_footfall?: number;
    designation?: number;
    website_clinic_url?: string;
    year_establishment?: string;
    ai_filter?: number;
    specializations?: string[];
};

export type ClinicCountryProps = {
    countries: Country[];
    clinic_detail: ClinicMandatory & ClinicBusiness;
};

export type ClinicProps = ClinicMandatory & ClinicBusiness;

export type MetaDataType = {
    countries: Country[];
    designations: MetaCol[];
    specializations: Specialization[];
};


export type ClinicOptionalProps = {
    designations: MetaCol[];
    specializations: Specialization[];
    clinic_detail: ClinicMandatory & ClinicBusiness;
};