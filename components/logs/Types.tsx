import { Dispatch, SetStateAction } from 'react';

export interface Log {
    id: number;
    user: {
        name: string;
        email: string;
    };
    action: string;
    ip_address: string;
    contact_number: string;
    created_at: string;
}

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
    loading: boolean;
    logs: Log[];
    pagination: Pagination;
}

export interface ChangePageFn {
    (page: number): void;
}

export interface PagingProps {
    logs: Log[];
    pagination: Pagination;
    changePage: ChangePageFn
}

export type SearchRequestBody = {
    page: number;
    q: string;
};

export type SetSearchFn = Dispatch<SetStateAction<string>>;

export interface SearchProps {
    search: string;
    setSearch: SetSearchFn
}