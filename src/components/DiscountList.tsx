import { DiscountListProps } from '../types/Props'


const DiscountList = ({ discountList }: DiscountListProps) => {
    return (
        <ul className='mt-10'>
            {discountList.map((item, index) => (
            <div key={item.id || index} className='mb-5 border-yellow-400 border-2'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
            ))}
        </ul>
    )
}

export default DiscountList