import { PagingProps } from '@/components/templates/Types'
import WebPagination from '@/components/webpagination'

const Paging = ({ templates, pagination, changePage }: PagingProps) => {
    return (templates && templates?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) &&
        <WebPagination pagination={pagination} changePage={changePage} />
    )
}

export default Paging;