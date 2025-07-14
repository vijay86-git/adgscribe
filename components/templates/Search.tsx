import { Input } from "@/components/ui/input"
import { SearchProps } from '@/components/templates/Types'

const Search = ({ search, setSearch }: SearchProps) => {
    return (<Input
        placeholder="Search by name..."
        className="max-w-sm"
        value={search ?? ''}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
    />)
}

export default Search;