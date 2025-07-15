"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow
} from "@/components/ui/table";
import Paging from "@/components/doctors/Paging";
import DoctorRow from "@/components/doctors/DoctorRow";
import Search from "@/components/doctors/Search";
import { Doctor, Pagination, SearchRequestBody } from "@/components/doctors/Types";
import { getDoctors } from "@/app/actions";

export default function List() {
    const [search, setSearch] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState<boolean>(true);
    const [pagination, setPagination] = useState<Pagination>({
        current_page: 1,
        first_page_url: null,
        from: 0,
        last_page: 1,
        last_page_url: null,
        links: [],
        next_page_url: null,
        path: null,
        per_page: 10,
        prev_page_url: null,
        to: 0,
        total: 0,
    });

    const fetchDoctors = async (page = 1, debouncedQuery = "") => {
        // const res = await fetch(`/api/doctors`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ page, q: encodeURIComponent(debouncedQuery) }),
        // });

        const requestBody: SearchRequestBody = {
            page,
            q: encodeURIComponent(debouncedQuery),
        };

        const response = await getDoctors(requestBody);
        if (response.success) {
            console.log(response.res.doctors.data, 'doctors');
            setLoading(false);
            setInitial(false);
            setDoctors(response.res.doctors.data);
            setPagination(response.res.doctors);
        } else {
            //setMessage(response.msg.message);
        }

        // const response = await res.json();
        // if (response.success) {
        //     setLoading(false);
        //     setDoctors(response.data.doctors.data);
        //     setPagination(response.data.doctors);
        // }
    };

    useEffect(() => {
        setLoading(true);
        fetchDoctors();
    }, []);

    const changePage = (page: number) => {
        setLoading(true);
        //setDoctors([]);
        fetchDoctors(page);
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
            fetchDoctors(); //setPatients([]);
            return;
        }
        setLoading(true);
        fetchDoctors(1, debouncedQuery);
    }, [debouncedQuery]);

    return (
        <div className={`${loading && (!initial) ? 'opacity-20' : ''}`}>
            <div className="space-y-4 mb-2">
                <Search search={search} setSearch={setSearch} />
            </div>
            <div>
                <div className={`overflow-hidden rounded-sm border-gray-200 border-1`}>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
                                    #
                                </TableHead>
                                <TableHead className="text-center bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
                                    Name
                                </TableHead>
                                <TableHead className="text-center bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
                                    Email Id
                                </TableHead>
                                <TableHead className="text-center bg-gray-100 font-bold text-gray-700 dark:text-gray-200 uppercase">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <DoctorRow
                                doctors={doctors}
                                pagination={pagination}
                                initial={initial}
                            />
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-5">
                    <Paging
                        doctors={doctors}
                        pagination={pagination}
                        changePage={changePage}
                    />
                </div>
            </div>
        </div>
    );
}
