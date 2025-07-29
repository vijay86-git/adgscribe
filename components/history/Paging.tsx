import { PagingProps } from '@/components/history/Types'
import WebPagination from '@/components/webpagination'

const Paging = ({ histories, pagination, changePage }: PagingProps) => {
    return (histories && histories?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) &&
        <WebPagination pagination={pagination} changePage={changePage} />
    )
}

export default Paging;