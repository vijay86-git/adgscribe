import { PagingProps } from '@/components/patients/Types'
import WebPagination from '@/components/webpagination'

const Paging = ({ patients, pagination, changePage }: PagingProps) => {
    return (patients && patients?.length > 0 && pagination?.total > Number(process.env.NEXT_PUBLIC_PAGINATION_LIMIT) &&
        <WebPagination pagination={pagination} changePage={changePage} />
    )
}

export default Paging;