import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { PagingProps } from '@/components/templates/Types'

const Paging = ({ templates, pagination, changePage }: PagingProps) => {

    return (templates && templates?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) && <Pagination>
        <PaginationContent>
            {pagination.current_page > 1 && (
                <PaginationItem>
                    <PaginationPrevious
                        className="pagination-prev"
                        aria-disabled={pagination.current_page === 1}
                        onClick={() => changePage(pagination.current_page - 1)}
                    />
                </PaginationItem>
            )}

            {/* First Page */}
            <PaginationItem>
                <PaginationLink
                    onClick={() => changePage(1)}
                    className={`cursor-default px-3 py-1 rounded ${pagination.current_page === 1 ? 'act text-white' : 'bg-gray-200'}`}
                >
                    1
                </PaginationLink>
            </PaginationItem>

            {/* Dots before current range */}
            {pagination.current_page > 4 && (
                <PaginationItem>
                    <span className="px-2">...</span>
                </PaginationItem>
            )}

            {/* Pages around current */}
            {Array.from({ length: 5 }, (_, i) => {
                const page = pagination.current_page - 2 + i;
                if (page > 1 && page < pagination.last_page) {
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => changePage(page)}
                                className={`cursor-default px-3 py-1 rounded ${pagination.current_page === page ? 'act text-white' : 'bg-gray-200'}`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                return null;
            })}

            {/* Dots after current range */}
            {pagination.current_page < pagination.last_page - 3 && (
                <PaginationItem>
                    <span className="px-2">...</span>
                </PaginationItem>
            )}

            {/* Last Page (if not same as first) */}
            {pagination.last_page > 1 && (
                <PaginationItem>
                    <PaginationLink
                        onClick={() => changePage(pagination.last_page)}
                        className={`cursor-default px-3 py-1 rounded ${pagination.current_page === pagination.last_page ? 'act text-white' : 'bg-gray-200'}`}
                    >
                        {pagination.last_page}
                    </PaginationLink>
                </PaginationItem>
            )}

            {pagination.current_page < pagination.last_page && (
                <PaginationItem>
                    <PaginationNext
                        aria-disabled={pagination.current_page === pagination.last_page}
                        onClick={() => changePage(pagination.current_page + 1)}
                    />
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>)
}

export default Paging;