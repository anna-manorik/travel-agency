export type TaskProps = {
    id: string,
    title: string;
    description: string;
    // deleteTaskFunk: (id: string) => void;
};

export type TaskPropsAdditional = TaskProps & {
    deleteTaskFunk: (id: string) => void;
  };

export type TaskListProps = {
    taskList: TaskProps[],
    deleteTaskFunk: (id: string) => void;
}
