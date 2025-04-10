import { TaskPropsAdditional } from '../types/TaskProps'
import { useState } from 'react';

const Task = ({ id, title, description, deleteTaskFunk }: TaskPropsAdditional) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const toggleComplete = () => {
        setIsCompleted((prev) => !prev);
    };

    return (
        <>
            <div className='task-item'>
                <span><b>Title:</b> {title}</span><br></br>
                <span><b>Description:</b> {description}</span><br></br>
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