import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getDoc, getFirestore } from "firebase/firestore";
import { getAuth, User  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import { doc, setDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

interface UserData {
  uid: string | null; // UID може бути null, якщо користувач не автентифікований
  email: string | null; // Email може бути null
  role: 'user' | 'admin' | null; // Роль може бути 'user', 'admin' або null, якщо не завантажена
  loading: boolean; // Вказує, чи триває завантаження даних про користувача
}

interface AuthContextType {
  currentUser: UserData;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Це наш провайдер, який буде обгортати інші компоненти і надавати їм доступ до стану
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Внутрішній стан AuthProvider, який містить дані про поточного користувача
  const [currentUser, setCurrentUser] = useState<UserData>({
    uid: null,
    email: null,
    role: null,
    loading: true, // Починаємо зі стану завантаження
  });

  // useEffect для підписки на зміни стану автентифікації Firebase
  useEffect(() => {
    // onAuthStateChanged повертає функцію, яка відписується від слухача
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        // Користувач увійшов
        console.log("AuthProvider: User logged in:", user.email);

        // --- ЛОГІКА ОТРИМАННЯ РОЛІ ---
        let userRole: 'user' | 'admin' = 'user'; // Роль за замовчуванням

        // Варіант Б: Отримання ролі з Cloud Firestore (якщо зберігаєте ролі там)
        // Раніше, коли ми не використовували Custom Claims
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userDataFromFirestore = userDocSnap.data();
            userRole = (userDataFromFirestore.role === 'admin' ? 'admin' : 'user');
            console.log("AuthProvider: Role from Firestore:", userRole);
          } else {
            console.warn(`AuthProvider: User document for UID ${user.uid} not found in Firestore. Defaulting role to 'user'.`);
            // Тут можна створити документ, якщо його немає, як обговорювали раніше.
            // await setDoc(doc(db, 'users', user.uid), { email: user.email, role: 'user', createdAt: new Date() });
          }
        } catch (error) {
          console.error("AuthProvider: Error getting user role from Firestore:", error);
        }
        // --- КІНЕЦЬ ЛОГІКИ ОТРИМАННЯ РОЛІ ---


        // Оновлюємо стан currentUser з отриманою роллю
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: userRole,
          loading: false, // Завантаження завершено
        });
      } else {
        // Користувач вийшов (або ще не увійшов)
        console.log("AuthProvider: User logged out.");
        setCurrentUser({ uid: null, email: null, role: null, loading: false }); // Завантаження завершено
      }
    });

    // Функція очищення: відписуємося від слухача при розмонтуванні компонента
    return () => unsubscribe();
  }, []); // Пустий масив залежностей означає, що useEffect запуститься один раз при монтуванні

  // Рендеримо AuthContext.Provider, який надає об'єкт currentUser всім дочірнім компонентам
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext); // <--- Ось тут він отримує значення з контексту
  if (context === undefined) {
    // Це важлива перевірка, яка допомагає уникнути помилок,
    // якщо розробник спробує використати useAuth поза AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Повертає об'єкт { currentUser: UserData }
};