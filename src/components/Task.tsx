type Props = {
    title: string;
    description: string;
    isCompleted: boolean;
    toggleComplete: Function;
  };

const Task = ({ title, description, isCompleted, toggleComplete}: Props) => {
    return (
        <>
            <div>{title}</div>
            <div>{description}</div>
            <span>Is Task completed? {isCompleted ? '✅' : '❌'}</span>
            <button onClick={() => toggleComplete((isCompleted: boolean) => isCompleted ? false : true)}>
                {isCompleted ? 'Open' : 'Done'}
            </button>
        </>
    )
}

export default Task; 