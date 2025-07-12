
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import { MessageProps } from "../types/Props.tsx";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

interface UserData {
  uid: string | null;
  email: string | null;
  role: 'user' | 'admin' | null;
  loading: boolean;
  messageList: MessageProps[] | null;
}

interface AuthContextType {
  userData: UserData;
  // currentUser від Firebase Auth можна також додати, якщо потрібно
  // currentUser: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData>({
    uid: null,
    email: null,
    role: null,
    loading: true,
    messageList: null,
  });

  // useEffect 1: Підписка на стан автентифікації Firebase
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(getAuth(app), (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribeAuth();
  }, []);

  // useEffect 2: Підписка на дані Firestore, залежить від firebaseUser
  useEffect(() => {
    let unsubscribeFirestore: () => void = () => {};

    if (firebaseUser) {
      const userDocRef = doc(db, 'users', firebaseUser.uid);

      // onSnapshot: Підписуємось на зміни документа користувача в реальному часі
      unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: (firestoreData.role === 'admin' ? 'admin' : 'user'),
            messageList: (firestoreData.messageList || []) as MessageProps[],
            loading: false,
          });
          console.log("Firestore User Data Updated (onSnapshot):", firestoreData);
        } else {
          console.warn(`Firestore: Документ для UID ${firebaseUser.uid} не знайдено.`);
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'user',
            messageList: [],
            loading: false,
          });
        }
      }, (error) => {
        console.error("Firestore (onSnapshot) Error:", error);
        setUserData(prev => ({ ...prev, loading: false }));
      });
    } else {
      // Користувач вийшов або не залогінений
      setUserData({ uid: null, email: null, role: null, loading: false, messageList: null });
    }

    return () => unsubscribeFirestore();
  }, [firebaseUser]); // Залежить від firebaseUser

  const value = { userData };

  return (
    <AuthContext.Provider value={value}>
      {!userData.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};