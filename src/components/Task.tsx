import { TaskPropsAdditional } from '../types/TaskProps'
import { useState } from 'react';

const Task = ({ id, title, description, editTaskFunk, deleteTaskFunk }: TaskPropsAdditional) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleComplete = () => {
        setIsCompleted((prev) => !prev);
    };

    return (
        <>
            <div className='task-item'>
                <b>Title:</b><span> <span id='title' onClick={() => editTaskFunk(id, 'title')}>{title}</span></span><br></br>
                <b>Description:</b><span> <span id='description' onClick={() => editTaskFunk(id, 'description')}>{description}</span></span><br></br>
                <span><b>Is Task completed?</b> {isCompleted ? '✅' : '❌'}</span>
                <button onClick={toggleComplete}>
                    {isCompleted ? 'Reopen' : 'Done'}
                </button>
                <button onClick={() => deleteTaskFunk(id)}>Delete</button>
            </div>
        </>
    )
}

export default Task;