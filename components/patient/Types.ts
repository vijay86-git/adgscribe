import { Dispatch, SetStateAction } from 'react';

export interface SearchPatient {
    label: string;
    personal_health_number: string;
    uuid: string;
    phone?: string;
}

export interface PatientType {
    id: number;
    age: number;
    contact_number: string;
    gender: string;
    patient_id: string;
    patient_name: string;
    personal_health_number: string;
    uuid: string;
}