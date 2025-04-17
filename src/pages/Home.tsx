import Slider from '../components/Slider'
import { useEffect, useState } from "react";
import { DiscountProps } from '../types/Props'
import { collection, getDocs } from 'firebase/firestore';
// @ts-ignore
import { db } from '../firebase/firebase';
import DiscountList from '../components/DiscountList';


const Home = () => {
    const [discountList, setDiscountList] = useState<DiscountProps[]>([])
    
      useEffect(() => {
        const fetchOffers = async () => {
            const querySnapshot = await getDocs(collection(db, 'discount'));
            const discount = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DiscountProps[];
            setDiscountList(discount)
          };

        fetchOffers()
      }, [])

      useEffect(() => {
        console.log(discountList);
      }, [discountList])
      

    return (
        <>
            <div className="flex-1">Homepage</div>
            <Slider />
            <DiscountList discountList={discountList} />
        </>
    )
}

export default Home;