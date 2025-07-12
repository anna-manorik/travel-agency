import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchUsers } from "../redux/slice";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { arrayUnion, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import { MessageProps } from "../types/Props.tsx";
import { nanoid } from "nanoid";

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
            console.log('teeeeest')
            if (!values.userId) {
                console.error("Помилка: ID користувача порожній. Повідомлення не буде відправлено.");
                alert("Будь ласка, оберіть користувача.");
                actions.setSubmitting(false);
                return;
            }

            await sendMessage(values.userId, values)
            // toast.success('Your review will appear after approving!');
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
    
    return (
        <>
            <Formik
            initialValues={{userId: '', userEmail: '', messageId: '', message: '', readed: false}}
            validationSchema={NewMessageSchema}
            onSubmit={handleSendMessage}
            >
                {({ handleSubmit, isSubmitting, values, handleChange, handleBlur, isValid }) => (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <select 
                        className="h-10 border-4 border-yellow-400"
                        value={values.userEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='userId'>
                        <option value=''>Choose user...</option>
                        {users?.map(user => (
                        <option key={user.id} value={user.id}>{user.email}</option>
                    ))}
                    </select>
                    <textarea 
                        name='message' 
                        className="h-10 border-4 border-yellow-400"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}>
                    </textarea>
                    <button
                      type="submit"
                    //   disabled={!isValid || isSubmitting}
                      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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