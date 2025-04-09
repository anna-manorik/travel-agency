import React from "react"
import { useState } from 'react'

type AddingFormProp = {
    addTask: (title: string, description: string) => void
}

const AddingForm = ({ addTask }: AddingFormProp) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addTask(title, description);
        setTitle('')
        setDescription('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button>ADD TASK</button>
        </form>
    )
}

export default AddingForm