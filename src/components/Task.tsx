import { TaskPropsAdditional } from '../types/Props'
import { useState } from 'react';

const Task = ({ id, title, description, category, editTaskFunk, deleteTaskFunk }: TaskPropsAdditional) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const categories = ["Home", "Work", "Family", "Study"];

    const toggleComplete = () => {
        setIsCompleted((prev) => !prev);
    };

    return (
        <>
            <div className='border-2 border-yellow-400 p-5'>
                <b>Title:</b><span> <span id='title' onClick={() => editTaskFunk(id, 'title')}>{title}</span></span><br></br>
                <b>Description:</b><span> <span id='description' onClick={() => editTaskFunk(id, 'description')}>{description}</span></span><br></br>
                <b>Category:</b><select>
                    <option>{category}</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select><br></br>
                <span><b>Is Task completed?</b> {isCompleted ? '✅' : '❌'}</span><br></br>
                <button onClick={toggleComplete} className="rounded-xl border-4 border-yellow-400 bg-yellow-300 font-bold mr-5 p-2">
                    {isCompleted ? 'Reopen' : 'Done'}
                </button>
                <button onClick={() => deleteTaskFunk(id)} className="rounded-xl border-4 border-yellow-400 bg-yellow-300 font-bold p-2">Delete</button>
            </div>
        </>
    )
}

export default Task;