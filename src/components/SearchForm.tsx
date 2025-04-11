import { useState } from "react"

type SearchProps = {
    searchTasksFunk: (category: string) => void
}

const SearchForm = ({ searchTasksFunk }: SearchProps) => {
    const [choosedCategory, setCategory] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
        searchTasksFunk(selectedValue); // одразу передаємо вибране значення
      };

    return (
        <>
            <label>Search by Category</label>
                <select value={choosedCategory} onChange={handleChange}>
                    <option value="" disabled>Choose Category</option>
                    <option>All</option>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Family</option>
                    <option>Study</option>
                </select>
        </>
    )
}

export default SearchForm