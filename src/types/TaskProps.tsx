export type TaskProps = {
    id: string,
    title: string;
    description: string;
    category: string,
};

export type TaskPropsAdditional = TaskProps & {
    editTaskFunk:(id: string, fieldType: string) => void;
    deleteTaskFunk: (id: string) => void;
  };

export type TaskListProps = {
    taskList: TaskProps[],
    editTaskFunk:(id: string, fieldType: string) => void;
    deleteTaskFunk: (id: string) => void;
}
