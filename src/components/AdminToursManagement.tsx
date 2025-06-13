import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchTours, setSelectedTour } from "../redux/slice";
import ToursList from "./ToursList";
import star from '../img/star.png'
import { useNavigate } from "react-router-dom";
import { ToursProps } from "../types/Props";
import { FieldArray, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

const tourCategories = [
  'Sea',
  'Excursion',
];

const EditTourSchema = Yup.object().shape({
    id: Yup.string().required(), // ID є обов'язковим для ідентифікації туру
    title: Yup.string().min(3, 'Назва має бути щонайменше 3 символи').max(100, 'Назва має бути не більше 100 символів').required('Назва туру є обов\'язковою'),
    description: Yup.string().min(10, 'Опис має бути щонайменше 10 символів').required('Опис є обов\'язковим'),
    rating: Yup.number().min(1, 'Рейтинг має бути не менше 1').max(5, 'Рейтинг має бути не більше 5').required('Рейтинг є обов\'язковим').typeError('Рейтинг має бути числом'),
    price: Yup.number().min(0, 'Ціна не може бути від\'ємною').required('Ціна є обов\'язковою').typeError('Ціна має бути числом'),
    image: Yup.string().url('Будь ласка, введіть дійсну URL-адресу для головного фото').required('Посилання на головне фото є обов\'язковим'),
    // sliderPhotos: Yup.array()
    //     .of(Yup.string().url('Будь ласка, введіть дійсну URL-адресу для фото слайдера').required('Посилання на фото слайдера є обов\'язковим'))
    //     .min(1, 'Додайте хоча б одне фото для слайдера').required('Фото для слайдера є обов\'ковими'),
    // createdAt: Yup.date().required('Дата створення є обов\'язковою').nullable(),
    category: Yup.string().required('Категорія є обов\'язковою'),
});

const AdminToursManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTourToEdit, setCurrentTourToEdit] = useState<ToursProps>()
    const toursList = useSelector((state: RootState) => state.tours.filteredTours);
    
    useEffect(() => {
        dispatch(fetchTours());
    }, []);

    const handleOpenInfo = (tour: ToursProps) => {
        dispatch(setSelectedTour(tour))
        navigate('/tour-info')
    }
    
    const handleEdit = (tour: ToursProps) => {
        setCurrentTourToEdit(tour)
        setIsModalOpen(true)
    }

    const handleUpdateTour = async (values: ToursProps, actions: FormikHelpers<ToursProps>) => {
        // console.log('Tour was updated!!', values)

        try {
        actions.setSubmitting(true);
        if (!values.id) {
            throw new Error("Tour ID is missing for update operation.");
        }
        // Перетворюємо Date на об'єкт, який Firestore зрозуміє, якщо потрібно
        //   const tourDataToUpdate = {
        //       ...values,
        //       createdAt: values.date instanceof Date ? values.date : new Date(values.date), // Переконайтеся, що це Date
        //   };
        
        await updateDoc(doc(db, 'tours', values.id), values);
        //   dispatch(updateTourLocally(tourDataToUpdate)); // Оновлюємо Redux Store
        alert('Тур успішно оновлено!');
        setIsModalOpen(false); // Закриваємо модальне вікно
        actions.resetForm();
        } catch (error: any) {
        console.error('Помилка оновлення туру:', error.message);
        alert(`Помилка оновлення туру: ${error.message}`);
        } finally {
        actions.setSubmitting(false);
        }
    }

    return (
        <>
        <ul className='mt-10 flex'>
            {toursList.map((currentTour, index) => (
                <li>
                    <div key={currentTour.id || index} className='w-50 mb-5 border-yellow-400 border-2 mr-5 shadow hover:shadow-orange-900 hover:shadow-xl'>
                        <h3 className='font-bold text-xl p-2 bg-green-200'>{currentTour.title}</h3>
                        {/* <p className='text-lg h-30 overflow-hidden p-2 bg-green-100'>{currentTourToEdit.description}</p> */}
                        <p className='text-xl font-bold p-2 bg-green-400'>{currentTour.price} EUR</p>
                        {/* <button onClick={() => handleAddToCart(currentTourToEdit)} className='w-full h-16 font-bold p-5 bg-orange-500 hover:bg-yellow-200'><span className="font-size: 34px;">BUY IT NOW 🛒</span></button> */}
                        <p className='text-lg p-2 bg-green-200'>Start: {currentTour.date.toDate().toLocaleDateString()}</p>
                        <div className="flex justify-center px-2 bg-yellow-100 p-2">
                            {Array.from({ length: currentTour.rating }).map((_, i) => (
                            <img key={i} src={star} alt="star" className="w-5 h-5" />
                            ))}
                        </div>
                        <button onClick={() => handleOpenInfo(currentTour)} className="text-blue-600 underline text-xl mt-5 mb-5">
                            See tour details...
                        </button>
                        <button onClick={() => handleEdit(currentTour)}>EDIT TOUR</button>

                        {/* <div className="bg-cover bg-center h-64 w-full" style={{ backgroundImage: `url(${currentTourToEdit.image})` }}></div> */}
                    </div>

                    {isModalOpen && currentTourToEdit &&  (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%' }}>
            <h3>Редагувати тур: {currentTourToEdit.title}</h3>
            <Formik
              initialValues={currentTourToEdit}
              validationSchema={EditTourSchema}
              onSubmit={handleUpdateTour}
              enableReinitialize={true} // Важливо для оновлення форми при зміні currentTourToEdit
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
                <form onSubmit={handleSubmit}>
                  {/* Поля форми редагування (аналогічні до AddTourForm) */}
                  {/* ID приховано, але передається у values */}
                  <input type="hidden" name="id" value={values.id} />

                  <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="edit-title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Назва туру:</label>
                      <input id="edit-title" name="title" type="text" onChange={handleChange} onBlur={handleBlur} value={values.title} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
                      {touched.title && errors.title ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.title}</div>) : null}
                  </div>
                  {/* ... Додайте інші поля для редагування: description, rating, price, mainPhotoUrl, category, createdAt */}
                  {/* Опис */}
                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="edit-description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Опис:</label>
                    <textarea id="edit-description" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} rows={5} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
                    {touched.description && errors.description ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.description}</div>) : null}
                  </div>
                  {/* Рейтинг */}
                  <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="edit-rating" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Рейтинг (1-5):</label>
                      <input id="edit-rating" name="rating" type="number" onChange={handleChange} onBlur={handleBlur} value={values.rating} min="1" max="5" step="1" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
                      {touched.rating && errors.rating ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.rating}</div>) : null}
                  </div>
                  {/* Ціна */}
                  <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="edit-price" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ціна:</label>
                      <input id="edit-price" name="price" type="number" onChange={handleChange} onBlur={handleBlur} value={values.price} min="0" step="0.01" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
                      {touched.price && errors.price ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.price}</div>) : null}
                  </div>
                  {/* Посилання на головне фото */}
                  <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="edit-mainPhotoUrl" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Посилання на головне фото:</label>
                      <input id="edit-mainPhotoUrl" name="mainPhotoUrl" type="url" onChange={handleChange} onBlur={handleBlur} value={values.image} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}/>
                      {touched.image && errors.image ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.image}</div>) : null}
                  </div>
                  {/* Категорія */}
                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="edit-category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Категорія:</label>
                    <select id="edit-category" name="category" onChange={handleChange} onBlur={handleBlur} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                      <option value="" label="Оберіть категорію..." />
                      {tourCategories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                    {touched.category && errors.category ? (<div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.category}</div>) : null}
                  </div>
                  {/* Дата створення (не редагуємо, але можемо відобразити) */}
                  {/* <div style={{ marginBottom: '15px' }}>
                      <label htmlFor="edit-createdAt" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Дата створення:</label>
                      <input id="edit-createdAt" name="createdAt" type="date" onChange={handleChange} onBlur={handleBlur} value={values.createdAt ? values.createdAt.toISOString().split('T')[0] : ''} disabled style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f0f0f0' }}/>
                  </div> */}

                  {/* Слайдер фото - потребує FieldArray, як і в AddTourForm */}
                  {/* <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Фото для слайдера:</label>
                    <FieldArray name="sliderPhotos">
                      {({ push, remove }) => (
                        <div>
                          {values.sliderPhotos.map((photoUrl, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                              <input
                                name={`sliderPhotos[${index}]`}
                                type="url"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={photoUrl}
                                style={{ flexGrow: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' }}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={values.sliderPhotos.length === 1}
                                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push('')}
                            style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            Додати ще фото
                          </button>
                          {typeof errors.sliderPhotos === 'string' ? (
                            <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.sliderPhotos}</div>
                          ) : null}
                        </div>
                      )}
                    </FieldArray>
                  </div> */}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {isSubmitting ? 'Оновлюємо...' : 'Зберегти зміни'}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
                </li>
            ))}
        </ul>
        {/* <div className={isModalOpen ? 'block' : 'hidden'}>Hello!!!!<button onClick={() => setIsModalOpen(false)}>X</button></div> */}

        
        </>

        // <ToursList toursList={toursList} />
    )
}

export default AdminToursManagement;