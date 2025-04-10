import { TaskListProps } from '../types/TaskProps';
import Task from './Task'

export const TaskList = ({ taskList, deleteTaskFunk }: TaskListProps) => {
    return (
        <ul className="task-list">
            {taskList.map(({ id, title, description }) => (
                <Task id={id} title={title} description={description} deleteTaskFunk={deleteTaskFunk} />
            ))}
        </ul>
    )
}

export default TaskList