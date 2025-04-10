import { TaskListProps } from '../types/TaskProps';
import Task from './Task'

export const TaskList = ({ taskList, editTaskFunk, deleteTaskFunk }: TaskListProps) => {
    return (
        <ul className="task-list">
            {taskList.map(({ id, title, description }) => (
                <Task id={id} title={title} description={description} editTaskFunk={editTaskFunk} deleteTaskFunk={deleteTaskFunk} />
            ))}
        </ul>
    )
}

export default TaskList