import React, { useState } from "react"

type SearchProps = {
    searchFunk: (searchValue: string) => void
}

const SearchForm = ({ searchFunk }: SearchProps) => {
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value
        setSearchValue(searchValue)
        searchFunk(searchValue)
    }

    return (
        <div className="flex">
            <label className="font-bold">Search by task title</label>
            <input type="text" onChange={handleChange} value={searchValue} className="block h-10 border-4 border-yellow-400 ml-5"></input>
        </div> 
    )
}

export default SearchForm