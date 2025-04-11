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
        <>
            <label>Search by task title</label>
            <input type="text" onChange={handleChange} value={searchValue}></input>
        </> 
    )
}

export default SearchForm