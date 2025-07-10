'use client'
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableHead, TableBody, TableRow } from "@/components/ui/table"
import Paging from '@/components/logs/Paging'
import LogRow from '@/components/logs/LogRow'
import Search from '@/components/logs/Search'
import { Log, Pagination, SearchRequestBody } from '@/components/logs/Types'
import { getLogs } from "@/app/actions";

export default function Logs() {

    const [search, setSearch] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<Pagination>({ current_page: 1, first_page_url: null, from: 0, last_page: 1, last_page_url: null, links: [], next_page_url: null, path: null, per_page: 10, prev_page_url: null, to: 0, total: 0 });

    const fetchLogs = async (page = 1, debouncedQuery = '') => {

        const requestBody: SearchRequestBody = {
            page,
            q: encodeURIComponent(debouncedQuery),
        };

        const response = await getLogs(requestBody);
        if (response.success) {
            setLoading(false);
            setLogs(response.res.logs.data);
            setPagination(response.res.logs);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchLogs();
    }, []);

    const changePage = (page: number) => {
        setLoading(true);
        setLogs([]);
        fetchLogs(page);
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
            fetchLogs();
            return;
        }
        setLoading(true);
        fetchLogs(1, debouncedQuery);
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
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Email Id</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Action</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Ip Address</TableHead>
                            <TableHead className="text-center font-bold text-gray-700 dark:text-gray-200 uppercase">Date/Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <LogRow logs={logs} pagination={pagination} loading={loading} />
                    </TableBody>
                </Table>
            </div>
            <div className="mt-5">
                <Paging logs={logs} pagination={pagination} changePage={changePage} />
            </div>
        </div>
    )
}
