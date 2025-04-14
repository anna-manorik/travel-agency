import { useState } from "react"

type FilterProps = {
    filterTasksFunk: (category: string) => void
}

const FilterForm = ({ filterTasksFunk }: FilterProps) => {
    const [choosedCategory, setCategory] = useState('')
    const categories = ["All", "Home", "Work", "Family", "Study"];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
        filterTasksFunk(selectedValue);
    };

    return (
        <div className="flex">
            <label className="font-bold">Filter by Category</label>
                <select value={choosedCategory} onChange={handleChange} className="block h-10 border-4 border-yellow-400 ml-5">
                    <option value="" disabled>Choose Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
        </div>
    )
}

export default FilterForm