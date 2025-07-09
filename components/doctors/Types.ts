import { Dispatch, SetStateAction } from 'react';

export interface Doctor {
    id: number;
    name: string;
    email: string;
    created_at: string;
}
export type SearchRequestBody = {
    page: number;
    q: string;
};

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Link[];
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface ListProps {
    initial: boolean
    doctors: Doctor[];
    pagination: Pagination;
}

export interface ChangePageFn {
    (page: number): void;
}

export interface PagingProps {
    doctors: Doctor[];
    pagination: Pagination;
    changePage: ChangePageFn
}

export type SetSearchFn = Dispatch<SetStateAction<string>>;

export interface SearchProps {
    search: string;
    setSearch: SetSearchFn
}