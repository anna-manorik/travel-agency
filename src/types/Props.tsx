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

export type Review = {
    id?: string;
    author: string;
    text: string;
    rating: number;
    date?: string;
    approved?: boolean;
};

export type ToursProps = {
    id: string;
    title: string;
    description: string;
    date: Timestamp;
    price: number;
    rating: number;
    image: string,
    category: string | null,
    sliderList?: string[]
    reviews?: Review[]
}

export type ToursListProps = {
    toursList: ToursProps[]
}

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    date: string;
  };
  
export type CartState = {
    items: CartItem[];
  };

export type ToursState = {
    allTours: ToursProps[];
    filteredTours: ToursProps[];
    loading: boolean;
  };

export type TourInfoState = {
    selectedTour: ToursProps | null;
    loading: boolean
  };

  export type UserProps = {
    id: string; // UID може бути null, якщо користувач не автентифікований
    email: string | null; // Email може бути null
    role: 'user' | 'admin' | null; // Роль може бути 'user', 'admin' або null, якщо не завантажена
    loading: boolean; // Вказує, чи триває завантаження даних про користувача
    messageList?: string[]
  };

  export type MessageProps = {
      userId: string,
      userEmail: string,
      messageId: string,
      message: string,
      readed: boolean
  }
