'use client'
import { Input } from "@/components/ui/input"
import { SearchProps } from '@/components/doctors/Types'
import { Search as SearchIcon } from "lucide-react"

const Search = ({ search, setSearch }: SearchProps) => {
    return (
        <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                placeholder="Search by name, emailid..."
                className="max-w-sm pl-9"
                value={search ?? ''}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
            />
        </div>
    )
}

export default Search;