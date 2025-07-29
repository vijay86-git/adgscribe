import { PagingProps } from '@/components/logs/Types'
import WebPagination from '@/components/webpagination'

const Paging = ({ logs, pagination, changePage }: PagingProps) => {
    return (logs && logs?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) &&
        <WebPagination pagination={pagination} changePage={changePage} />
    )
}

export default Paging;