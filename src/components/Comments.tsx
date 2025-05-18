import { useState } from 'react';
import { ToursProps, Review } from '../types/Props'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../pages/Home';
import { toast, ToastContainer } from 'react-toastify';
import star from '../img/star.png'
import { v4 as uuidv4 } from 'uuid';

const validationSchema = Yup.object({
    author: Yup.string()
        .required('*required'),
    text: Yup.string()
      .min(20, 'min 20 symbols')
      .required('*required'),
    rating: Yup.number()
    .required('*required')
    .min(3, 'Min rating — 1')
    .max(5, 'Max rating — 5'),
  });

const Comments = (tour: ToursProps) => {
    const [reviews, setReviews] = useState<Review[]>(tour?.reviews || []);
    const approvedReviews = reviews?.filter(review => review.approved)

    const handleSubmitReview = (values: Review) => {
        if (!tour) return;
        addReviewToTour(tour.id, values)
        setReviews(prev => [...prev, values]);
        toast.success('Your review will appear after approving!');
    }

    const addReviewToTour = async (tourId: string, review: Review) => {
        const tourRef = doc(db, 'tours', tourId);
      
        try {
          await updateDoc(tourRef, {
            reviews: arrayUnion({...review, approved: false, date: new Date().toISOString(), id: uuidv4()})
          });
        } catch (error) {
          console.error('Error during adding review', error);
        }
      };

    if (!tour) return <p>Tour not found</p>;

    return (
        <>
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">REVIEWS</h3>
                <div className="space-y-6">
                {approvedReviews.length ? (
                    approvedReviews.map((review, index) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                    >
                        <p className="text-gray-800 text-base mb-4">"{review.text}"</p>

                        <div className="flex justify-center mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <img key={i} src={star} alt="star" className="w-5 h-5 mr-1" />
                        ))}
                        </div>

                        <p className="text-sm text-gray-500 italic">— {review.author}, {review.date?.split("T")[0]}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500">Any reviews for this tour.</p>
                )}
                </div>
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-sm max-w-xl mx-auto">
                <Formik
                    initialValues={{ author: '', text: '', rating: 0 }}
                    onSubmit={(values, actions) => {
                        handleSubmitReview(values);
                        actions.resetForm();
                    }}
                    validationSchema={validationSchema}
                    >
                    {() => (
                        <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-sm max-w-xl mx-auto">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add your comment:</h3>

                        <Form className="space-y-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Field
                                name="author"
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-yellow-400"
                            />
                            <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
                            </div>
                            

                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                            <Field
                                as="textarea"
                                name="text"
                                placeholder="Review"
                                rows={4}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-yellow-400 resize-none"
                            />
                            <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <Field 
                                as="select" 
                                name="rating"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-yellow-400 resize-none"
                                >
                                    <option value="">Choose your rating</option>
                                    <option value="3">⭐⭐⭐</option>
                                    <option value="4">⭐⭐⭐⭐</option>
                                    <option value="5">⭐⭐⭐⭐⭐</option>
                                </Field>
                                <ErrorMessage name="rating" component="div" className="text-red-500 text-sm pt-1" />
                            </div>

                            <button
                            type="submit"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition"
                            >
                            Add review
                            </button>
                        </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )

}

export default Comments