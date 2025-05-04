import { DiscountListProps } from '../types/Props'


const DiscountList = ({ discountList }: DiscountListProps) => {
    return (
        <ul className='mt-10 flex'>
            {discountList.map((item, index) => (
            <div key={item.id || index} className='w-48 mb-5 border-yellow-400 border-2 mr-5'>
                <h3 className='font-bold text-xl p-2 bg-green-200'>{item.title}</h3>
                <p className='text-lg p-2 bg-green-100'>{item.description}</p>
                <img src={item.image} className='' />
            </div>
            ))}
        </ul>
    )
}

export default DiscountList