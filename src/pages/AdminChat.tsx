import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchUsers } from "../redux/slice";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup';
import { arrayUnion, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import { MessageProps } from "../types/Props.tsx";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import Select from 'react-select';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}


const NewMessageSchema = Yup.object({
    message: Yup.string()
      .min(6, 'min 6 symbols')
      .required('*required'),
  });

const AdminChat = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);


        const formik = useFormik({
            initialValues: {
            userId: '' // ми зберігаємо лише value
            },
            onSubmit: values => {
            console.log(values);
            }
        });

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    if (loading === 'pending') {
        return <div>Завантаження користувачів...</div>;
    }

    if (loading === 'failed') {
        return <div>Помилка: {error}</div>;
    }

        const handleSendMessage = async (values: MessageProps, actions: FormikHelpers<MessageProps>) => {
            // console.log('teeeeest', values)
            if (!values.userId) {
                console.error("Помилка: ID користувача порожній. Повідомлення не буде відправлено.");
                toast.error("Будь ласка, оберіть користувача.");
                actions.setSubmitting(false);
                return;
            }
toast.success('Your message was sent');
            await sendMessage(values.userId, values)
            
        }

        const sendMessage = async (userId: string, message: MessageProps) => {
            const userRef = doc(db, 'users', userId);
        
            try {
            await updateDoc(userRef, {
                messageList: arrayUnion({messageId: nanoid(), message: message.message, readed: false})
            });
            } catch (error) {
                console.error('Error during sending message', error);
            }
        };

        const options = users.map(user => ({
            value: user.id,
            label: user.email
        }));

        const selectedOption = options.find(
            (option) => option.value === formik.values.userId
        );
    
    return (
        <>
            <Formik
            initialValues={{userId: '', userEmail: '', messageId: '', message: '', readed: false}}
            validationSchema={NewMessageSchema}
            onSubmit={handleSendMessage}
            >
                {({ handleSubmit, isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <Select
                        className="h-10 border-4 border-yellow-400"
                        name="userId"
                        value={selectedOption} // об'єкт { value, label }
                        onChange={(option) => setFieldValue('userId', option?.value)} // зберігаємо тільки ID
                        onBlur={handleBlur}
                        options={options}
                    />
                    <textarea 
                        name='message' 
                        className="h-10 border-4 border-yellow-400"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}>
                    </textarea>
                    <button
                      type="submit"
                      className='class="px-5 py-2.5 bg-green-600 text-white rounded cursor-pointer'
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                </form>
                )}
            </Formik>
        </>
    )
}

export default AdminChat