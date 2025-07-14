'use client'
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableHead, TableBody, TableRow } from "@/components/ui/table"
import Paging from '@/components/templates/Paging'
import TemplateRow from '@/components/templates/TemplateRow'
import Search from '@/components/templates/Search'
import { Template, Pagination, SearchRequestBody } from '@/components/templates/Types'
import { getTemplates } from "@/app/actions";

export default function List() {

    const [search, setSearch] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<Pagination>({ current_page: 1, first_page_url: null, from: 0, last_page: 1, last_page_url: null, links: [], next_page_url: null, path: null, per_page: 10, prev_page_url: null, to: 0, total: 0 });

    const fetchTemplates = async (page = 1, debouncedQuery = '') => {

        const requestBody: SearchRequestBody = {
            page,
            q: encodeURIComponent(debouncedQuery),
        };

        const response = await getTemplates(requestBody);
        if (response.success) {
            setLoading(false);
            setTemplates(response.res.templates.data);
            setPagination(response.res.templates);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTemplates();
    }, []);

    const changePage = (page: number) => {
        setLoading(true);
        setTemplates([]);
        fetchTemplates(page);
    };

    // Update debouncedQuery 500ms after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // Run API call when debouncedQuery changes
    useEffect(() => {
        if (!debouncedQuery) {
            fetchTemplates();
            return;
        }
        setLoading(true);
        fetchTemplates(1, debouncedQuery);
    }, [debouncedQuery]);

    return (
        <div>
            <div className="space-y-4 mb-2">
                <Search search={search} setSearch={setSearch} />
            </div>
            <div className="overflow-hidden rounded-sm border border-gray-200 border-1">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">#</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Name</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Status</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Date/Time</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TemplateRow templates={templates} pagination={pagination} loading={loading} />
                    </TableBody>
                </Table>
            </div>
            <div className="mt-5">
                <Paging templates={templates} pagination={pagination} changePage={changePage} />
            </div>
        </div>
    )
}
