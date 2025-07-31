import { Timestamp } from "firebase/firestore";
import { MessageProps, UserProps } from "./Props";

export interface TourFormValues {
    title: string,
    description: string,
    date: Timestamp,
    price: number,
    rating: number,
    image: string,
    category: string,
    sliderList?: string[]
}

export interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'user')[]; // Опціональний масив дозволених ролей
}

export interface UserData {
  uid: string | null;
  email: string | null;
  role: 'user' | 'admin' | null;
  loading: boolean;
  messageList: MessageProps[] | null;
}

export interface AuthContextType {
  userData: UserData;
}

export interface UsersState {
  users: UserProps[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}