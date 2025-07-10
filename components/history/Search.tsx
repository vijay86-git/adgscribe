import { Input } from "@/components/ui/input"
import { SearchProps } from '@/components/history/Types'

const Search = ({ search, setSearch }: SearchProps) => {
    return (<Input
        placeholder="Search by patient id, personal health number..."
        className="max-w-sm"
        value={search ?? ''}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
    />)
}

export default Search;