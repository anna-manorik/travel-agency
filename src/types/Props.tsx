import { Timestamp } from "firebase/firestore";

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

export type DiscountProps = {
    id: string;
    title: string;
    description: string;
    image: string,
}

export type DiscountListProps = {
    discountList: DiscountProps[]
}

export type ToursProps = {
    id: string;
    title: string;
    description: string;
    date: Timestamp;
    price: number;
    rating: number;
    image: string,
}

export type ToursListProps = {
    toursList: ToursProps[]
}


