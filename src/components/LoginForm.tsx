import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getIdTokenResult, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext.tsx';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

type AuthUser = {
    login: string;
    password: string;
};

const validationSchema = Yup.object({
    login: Yup.string()
      .email('invalid email')
      .required('*required'),
    password: Yup.string()
      .min(6, 'min 6 symbols')
      .required('*required'),
  });

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { userData } = useAuth()
    
        const handleLogin = (values: AuthUser, actions: FormikHelpers<AuthUser>) => {
            checkUser(values.login, values.password)
            actions.resetForm();
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            signOut(auth)
        };

        const checkUser = async (login: string, password: string) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, login, password);
                const user = userCredential.user;
                
                const token = await user.getIdToken();
                localStorage.setItem('token', token);
              } catch (error: any) {
                console.error('Login failed:', error.message);
              }
        }
        
        return (
            <div className='flex flex-col items-center'>
                <span className='text-lg font-bold p-5'>{!userData.loading !== null && userData.uid !== null ? `Welcome, ${userData.email}! Your current role: ${userData.role || 'N/A'}` : 'Please, login for proseed!'}</span>
                <Formik initialValues={{login: '', password: ''}} onSubmit={(values, actions) => {handleLogin(values, actions)}} validationSchema={validationSchema}>
                    <Form className="flex flex-col mb-10 max-w-md mx-auto p-4 bg-white rounded shadow-md">
                        <Field as="input" name="login" type="email" placeholder="Login" className="h-10 border-4 border-yellow-400" />
                        <ErrorMessage name="login" component="div" className="text-red-500 text-sm" />
                        <div className="relative">
                            <Field as="input" name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="h-10 border-4 border-yellow-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword 
                                ? (<EyeSlashIcon className="h-5 w-5" />) 
                                : (<EyeIcon className="h-5 w-5" />)}
                            </button>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button type="submit" onClick={() => handleLogin} className="h-10 border-4 border-yellow-400 rounded-xl bg-yellow-300 font-bold">LOG IN</button>
                    </Form>
                </Formik>
                
                <button disabled={!userData.uid} type="submit" onClick={handleLogout} className="w-40 h-10 border-4 border-yellow-400 rounded-xl bg-yellow-300 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600">LOG OUT</button><br />
            </div>
        )
}

export default LoginForm