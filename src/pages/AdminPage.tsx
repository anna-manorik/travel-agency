import React, { useEffect } from 'react';
import { Review, ToursProps } from '../types/Props'
import { useFormik, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import ToursList from '../components/ToursList.tsx';
import AdminToursManagement from '../components/AdminToursManagement.tsx';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

interface TourFormValues {
    title: string,
    description: string,
    date: Timestamp,
    price: number,
    rating: number,
    image: string,
    category: string,
    sliderList?: string[]
}

const tourCategories = [
  'Sea',
  'Excursion',
];

const TourSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Назва має бути щонайменше 3 символи')
    .max(100, 'Назва має бути не більше 100 символів')
    .required('Назва туру є обов\'язковою'),
  description: Yup.string()
    .min(10, 'Опис має бути щонайменше 10 символів')
    .required('Опис є обов\'язковим'),
  rating: Yup.number()
    .min(1, 'Рейтинг має бути не менше 1')
    .max(5, 'Рейтинг має бути не більше 5')
    .required('Рейтинг є обов\'язковим')
    .typeError('Рейтинг має бути числом'), // Валідація на тип "число"
  price: Yup.number()
    .min(0, 'Ціна не може бути від\'ємною')
    .required('Ціна є обов\'язковою')
    .typeError('Ціна має бути числом'),
  image: Yup.string()
    .url('Будь ласка, введіть дійсну URL-адресу для головного фото')
    .required('Посилання на головне фото є обов\'язковим'),
    category: Yup.string()
    .oneOf(tourCategories, 'Будь ласка, оберіть дійсну категорію') // Перевіряємо, чи значення є одним з дозволених
    .required('Категорія є обов\'язковою'),
//   sliderList: Yup.array()
//     .of(
//       Yup.string()
//         .url('Будь ласка, введіть дійсну URL-адресу для фото слайдера')
//         .required('Посилання на фото слайдера є обов\'язковим')
//     )
    // .min(1, 'Додайте хоча б одне фото для слайдера')
    // .required('Фото для слайдера є обов\'язковими'),
});

const AdminPage = () => {
    const initialValues: TourFormValues = {
        title: '',
        description: '',
        date: Timestamp.fromDate(new Date()),
        price: 0,
        rating: 1,
        image: '',
        category: '',
        sliderList: [],
    }
    
    const handleSubmit = async (values: TourFormValues, actions: FormikHelpers<TourFormValues>) => {
    try {
      actions.setSubmitting(true); // Встановлюємо стан "відправляється"

      // Додаємо документ до колекції 'tours'. Firebase генерує ID автоматично.
      const docRef = await addDoc(collection(db, 'tours'), values);

      console.log('Тур успішно додано з ID:', docRef.id);
      alert(`Тур "${values.title}" успішно додано! ID: ${docRef.id}`);

      actions.resetForm(); // Очищаємо форму після успішної відправки
    } catch (error: any) {
      console.error('Помилка при додаванні туру:', error.message);
      alert(`Помилка при додаванні туру: ${error.message}`);
    } finally {
      actions.setSubmitting(false); // Завершуємо стан "відправляється"
    }
  };

  return (
    <>
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Додати новий тур</h2>
      <Formik initialValues={initialValues} onSubmit={(values, actions) => {handleSubmit(values, actions)}} validationSchema={TourSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: formikHandleSubmit, // Перейменовуємо для уникнення конфлікту з нашою handleSubmit
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={formikHandleSubmit}>
            {/* Назва туру */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Назва туру:</label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {touched.title && errors.title ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.title}</div>
            ) : null}
            </div>

            {/* Опис */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Опис:</label>
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                rows={5}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {touched.description && errors.description ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.description}</div>
            ) : null}
            </div>

            {/* Категорія */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Категорія:</label>
            <select
                id="category"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
                <option value="" label="Оберіть категорію..." /> {/* Порожній варіант за замовчуванням */}
                {tourCategories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
            {touched.category && errors.category ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.category}</div>
            ) : null}
            </div>

            {/* Рейтинг */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Рейтинг (1-5):</label>
            <input
                id="rating"
                name="rating"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rating}
                min="1"
                max="5"
                step="1"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {touched.rating && errors.rating ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.rating}</div>
            ) : null}
            </div>

            {/* Ціна */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ціна:</label>
            <input
                id="price"
                name="price"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                min="0"
                step="10"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {touched.price && errors.price ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.price}</div>
            ) : null}
            </div>

            {/* Посилання на головне фото */}
            <div style={{ marginBottom: '15px' }}>
            <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Посилання на головне фото:</label>
            <input
                id="image"
                name="image"
                type="url" // Використовуйте type="url" для кращої валідації браузера
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            {touched.image && errors.image ? (
                <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.image}</div>
            ) : null}
            </div>

            {/* Фото для слайдера (динамічний список) */}
            <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Фото для слайдера:</label>
            <FieldArray name="sliderList">
                {({ push, remove }) => (
                <div>
                    {values.sliderList?.map((photoUrl, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                        name={`sliderList[${index}]`} // Важливо для Formik!
                        type="url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={photoUrl}
                        style={{ flexGrow: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' }}
                        />
                        <button
                        type="button"
                        onClick={() => remove(index)}
                        disabled={values.sliderList?.length === 1} // Не дозволяємо видалити останнє поле
                        style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                        X
                        </button>
                    </div>
                    ))}
                    <button
                    type="button"
                    onClick={() => push('')} // Додати нове порожнє поле
                    style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                    Додати ще фото
                    </button>
                    {/* Валідація для всього масиву */}
                    {typeof errors.sliderList === 'string' ? (
                    <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.sliderList}</div>
                    ) : null}
                </div>
                )}
          </FieldArray>
            </div>

            {/* Кнопка відправки форми */}
            <button
            type="submit"
            disabled={!isValid || isSubmitting}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
            >
            {isSubmitting ? 'Додаємо...' : 'Додати тур'}
            </button>
          </form>
        )}
      </Formik>
    </div>
    <AdminToursManagement />
    </>
  );
}

export default AdminPage;