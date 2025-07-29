import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { PagingProps } from "@/components/doctors/Types";
import WebPagination from '@/components/webpagination'

const Paging = ({ doctors, pagination, changePage }: PagingProps) => {
    return (doctors && doctors?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) &&
        <WebPagination pagination={pagination} changePage={changePage} />
    )
};

export default Paging;
