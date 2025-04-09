import { TaskListProps } from '../types/TaskProps';
import Task from './Task'

export const TaskList = ({ taskList }: TaskListProps) => {
    return (
        <ul className="task-list">
            {taskList.map(({ title, description }) => (
                <Task title={title} description={description} />
            ))}
        </ul>
    )
}

export default TaskList