import { ToursListProps, ToursProps } from '../types/Props'
import star from '../img/star.png'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { addItem } from '../redux/slice'
// import { CartItem } from '../types/Props'

const ToursList = ({ toursList }: ToursListProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleAdd = (item: ToursProps) => {
        dispatch(addItem({...item, name: item.title, quantity: 1}))
    }

    return (
        <ul className='mt-10 flex'>
            {toursList.map((item, index) => (
            <div key={item.id || index} className='w-50 mb-5 border-yellow-400 border-2 mr-5 shadow hover:shadow-orange-900 hover:shadow-xl'>
                <h3 className='font-bold text-xl p-2 bg-green-200'>{item.title}</h3>
                <p className='text-lg h-30 overflow-hidden p-2 bg-green-100'>{item.description}</p>
                <p className='text-xl font-bold p-2 bg-green-400'>{item.price} EUR</p>
                <button onClick={() => handleAdd(item)} className='h-16 font-bold p-5 hover:bg-yellow-200'><span className="font-size: 34px;">BUY IT NOW 🛒</span></button>
                <p className='text-lg p-2 bg-green-200'>Start: {item.date.toDate().toLocaleDateString()}</p>
                <div className="flex justify-center px-2 bg-yellow-100 p-2">
                    {Array.from({ length: item.rating }).map((_, i) => (
                    <img key={i} src={star} alt="star" className="w-5 h-5" />
                    ))}
                </div>
                <div className="bg-cover bg-center h-64 w-full" style={{ backgroundImage: `url(${item.image})` }}></div>
            </div>
            ))}
        </ul>
    )
}

export default ToursList