import { useState } from 'react'

type AddingFormProp = {
    addTask: (title: string, description: string, category: string) => void
}

const AddingForm = ({ addTask }: AddingFormProp) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addTask(title, description, category);
        setTitle('')
        setDescription('')
        setCategory('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Choose Category</option>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Family</option>
                    <option>Study</option>
                </select>
            <button>ADD TASK</button>
        </form>
    )
}

export default AddingForm