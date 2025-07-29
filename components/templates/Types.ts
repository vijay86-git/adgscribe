import { Dispatch, SetStateAction } from 'react';

export interface Template {
    id: number;
    name: string;
    template: string;
    status: number;
    created_at: string;
    uuid: string;
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
    templates: Template[];
    pagination: Pagination;
}

export interface ChangePageFn {
    (page: number): void;
}

export interface PagingProps {
    templates: Template[];
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