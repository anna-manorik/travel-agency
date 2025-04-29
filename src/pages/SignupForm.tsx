import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

type NewUser = {
    username: string;
    email: string,
    password: string;
    confirmPassword: string
};

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
        .required('*required'),
    email: Yup.string()
      .email('invalid email')
      .required('*required'),
    password: Yup.string()
      .min(6, 'min 6 symbols')
      .required('*required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords are not equal!')
    .required('*required'),
  });

const SignupForm = () => {
    const [user, setUser] = useState<NewUser | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isSignedup, setIsSignedup] = useState(false)
    const navigate = useNavigate();

    const handleSignUp = async (values: NewUser, actions: FormikHelpers<NewUser>) => {
        try {
            await signup(values.email, values.password);
            setUser(values)
            setIsSignedup(true)
            actions.resetForm()
            navigate('/home');
            console.log('User registered successfully!');
          } catch (error) {
            console.error('Registration error:', error);
          }
    }

    const signup = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <div className='flex flex-col items-center'>
            {isSignedup 
                ? (<span className='text-lg font-bold p-5 text-green-800'>{user?.username}, thank you for registration!</span>) 
                : (<span className='text-lg font-bold p-5 text-red-600'>Please, sign up!</span>)
            }
                <Formik initialValues={initialValues} onSubmit={(values, actions) => {handleSignUp(values, actions)}} validationSchema={validationSchema}>
                    <Form className="flex flex-col mb-10 max-w-md mx-auto p-4 bg-white rounded shadow-md">
                        <Field as="input" name="username" type="text" placeholder="Username" className="h-10 border-4 border-yellow-400" />
                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

                        <Field as="input" name="email" type="email" placeholder="Login" className="h-10 border-4 border-yellow-400" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

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

                        <div className="relative">
                            <Field as="input" name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Repeat Password" className="h-10 border-4 border-yellow-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword 
                                ? (<EyeSlashIcon className="h-5 w-5" />) 
                                : (<EyeIcon className="h-5 w-5" />)}
                            </button>
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button type="submit" onClick={() => handleSignUp} className="h-10 border-4 border-yellow-400 rounded-xl bg-yellow-300 font-bold">SIGN UP</button>
                    </Form>
                </Formik>
                
            </div>
    )
}

export default SignupForm