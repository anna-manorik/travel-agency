import { useSelector } from 'react-redux';
import Slider from '../components/Slider'
import { Review } from '../types/Props'
import { useLocation } from "react-router-dom";
import { RootState } from '../redux/store';
import { Formik, Form, Field } from 'formik';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../pages/Home';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourInfo = () => {
    const tour = useSelector((state: RootState) => state.tourInfo.selectedTour);
    const [reviews, setReviews] = useState<Review[]>(tour?.reviews || []);

    const handleSubmitReview = (values: Review) => {
        if (!tour) return;
        addReviewToTour(tour.id, values)
        setReviews(prev => [...prev, values]);
        toast.success('Your review was added!');
    }

    const addReviewToTour = async (tourId: string, review: Review) => {
        const tourRef = doc(db, 'tours', tourId);
      
        try {
          await updateDoc(tourRef, {
            reviews: arrayUnion(review) // 🔥 додає до масиву без перезапису
          });
          console.log('Відгук додано!');
        } catch (error) {
          console.error('Помилка при додаванні відгуку:', error);
        }
      };

    if (!tour) return <p>Tour not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6 mt-10">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-bold text-gray-800">{tour.title}</h2>

            <p className="text-gray-600 text-lg">{tour.description}</p>

            <div className="flex items-center gap-2 text-yellow-500 text-xl">
                {'⭐'.repeat(Math.floor(tour.rating))}
                <span className="text-gray-700 text-sm">({tour.rating.toFixed(1)})</span>
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full transition">
                BUY THIS TOUR &#128512;
            </button>

            <Slider photoList={tour.sliderList} />

            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">REVIEWS</h3>
                <div className="space-y-4">
                {reviews?.length ? (
                    reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4 text-gray-700">
                        <p className="text-lg">"{review.text}"</p>
                        <p className="text-sm text-gray-500 mt-1 italic">— {review.author}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500">Any reviews for this tour.</p>
                )}
                </div>
            </div>

            <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-sm max-w-xl mx-auto">
                <Formik
                    initialValues={{ author: '', text: '' }}
                    onSubmit={(values, actions) => {
                        handleSubmitReview(values);
                        actions.resetForm();
                    }}
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
        </div>
    )
}

export default TourInfo