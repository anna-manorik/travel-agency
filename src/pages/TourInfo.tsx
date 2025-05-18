import { useSelector } from 'react-redux';
import Slider from '../components/Slider'
import Comments from '../components/Comments';
import { Review } from '../types/Props'
import { useLocation } from "react-router-dom";
import { RootState } from '../redux/store';


import 'react-toastify/dist/ReactToastify.css';

const TourInfo = () => {
    const tour = useSelector((state: RootState) => state.tourInfo.selectedTour);
    // const [reviews, setReviews] = useState<Review[]>(tour?.reviews || []);

    // const handleSubmitReview = (values: Review) => {
    //     if (!tour) return;
    //     addReviewToTour(tour.id, values)
    //     setReviews(prev => [...prev, values]);
    //     toast.success('Your review was added!');
    // }

    // const addReviewToTour = async (tourId: string, review: Review) => {
    //     const tourRef = doc(db, 'tours', tourId);
      
    //     try {
    //       await updateDoc(tourRef, {
    //         reviews: arrayUnion(review) // 🔥 додає до масиву без перезапису
    //       });
    //       console.log('Відгук додано!');
    //     } catch (error) {
    //       console.error('Помилка при додаванні відгуку:', error);
    //     }
    //   };

    if (!tour) return <p>Tour not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6 mt-10">
            
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
            <Comments {...tour} />

            
        </div>
    )
}

export default TourInfo