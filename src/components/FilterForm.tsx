import { useState } from "react"

type FilterProps = {
    filterTasksFunk: (category: string) => void
}

const FilterForm = ({ filterTasksFunk }: FilterProps) => {
    const [choosedCategory, setCategory] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
        filterTasksFunk(selectedValue);
    };

    return (
        <>
            <label>Filter by Category</label>
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

export default FilterForm