import { TaskListProps } from '../types/Props';
import Task from './Task'

export const TaskList = ({ taskList, editTaskFunk, deleteTaskFunk }: TaskListProps) => {
    return (
        <ul className="task-list">
            {taskList.map(({ id, title, description, category }) => (
                <Task id={id} title={title} description={description} category={category} editTaskFunk={editTaskFunk} deleteTaskFunk={deleteTaskFunk} />
            ))}
        </ul>
    )
}

export default TaskList