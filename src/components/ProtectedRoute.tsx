import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'user')[]; // Опціональний масив дозволених ролей
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { userData } = useAuth();

  // 1. Стан завантаження: Показуємо щось, поки ми отримуємо дані про користувача
  if (userData.loading) {
    return <div>Loading user data...</div>; // Або ваш власний компонент завантаження
  }

  // 2. Користувач не автентифікований: Перенаправляємо на сторінку входу
  if (!userData.uid) {
    console.log("ProtectedRoute: User not authenticated, redirecting to /home");
    return <Navigate to="/" replace />;
  }

  // 3. Користувач автентифікований, перевіряємо роль
  // Якщо allowedRoles не вказано, це означає, що доступ дозволений будь-якому автентифікованому користувачу.
  // Якщо allowedRoles вказано, ми перевіряємо, чи поточна роль користувача входить до дозволених.
  if (allowedRoles && userData.role && !allowedRoles.includes(userData.role)) {
    console.log(`ProtectedRoute: Access denied for role "${userData.role}". Redirecting to /`);
    // Користувач увійшов, але не має потрібної ролі.
    // Можна перенаправити на головну сторінку, або на сторінку "Доступ заборонено".
    // Я перенаправляю на "/" для простоти.
    return <Navigate to="/" replace />;
  }

  // 4. Якщо всі перевірки пройшли успішно, дозволяємо доступ до вкладених маршрутів
  console.log(`ProtectedRoute: Access granted for role "${userData.role}"`);
  return <Outlet />;
};

export default ProtectedRoute;