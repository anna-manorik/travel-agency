type Props = {
    title: string;
    description: string;
    isCompleted: boolean;
  };

const Task = ({ title, description, isCompleted}: Props) => {
    return (
        <>
            <div>{title}</div>
            <div>{description}</div>
        </>
    )
}

export default Task;