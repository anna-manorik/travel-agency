import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'user')[]; // Опціональний масив дозволених ролей
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  console.log('!!!!0', currentUser)

  // 1. Стан завантаження: Показуємо щось, поки ми отримуємо дані про користувача
  if (currentUser.loading) {
    return <div>Loading user data...</div>; // Або ваш власний компонент завантаження
  }

  // 2. Користувач не автентифікований: Перенаправляємо на сторінку входу
  if (!currentUser.uid) {
    console.log("ProtectedRoute: User not authenticated, redirecting to /home");
    return <Navigate to="/" replace />;
  }

  // 3. Користувач автентифікований, перевіряємо роль
  // Якщо allowedRoles не вказано, це означає, що доступ дозволений будь-якому автентифікованому користувачу.
  // Якщо allowedRoles вказано, ми перевіряємо, чи поточна роль користувача входить до дозволених.
  if (allowedRoles && currentUser.role && !allowedRoles.includes(currentUser.role)) {
    console.log(`ProtectedRoute: Access denied for role "${currentUser.role}". Redirecting to /`);
    // Користувач увійшов, але не має потрібної ролі.
    // Можна перенаправити на головну сторінку, або на сторінку "Доступ заборонено".
    // Я перенаправляю на "/" для простоти.
    return <Navigate to="/" replace />;
  }

  // 4. Якщо всі перевірки пройшли успішно, дозволяємо доступ до вкладених маршрутів
  console.log(`ProtectedRoute: Access granted for role "${currentUser.role}"`);
  return <Outlet />;
};

export default ProtectedRoute;