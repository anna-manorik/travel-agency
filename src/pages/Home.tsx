import Slider from '../components/Slider'
import LoginForm from '../components/LoginForm';
import { useEffect, useState } from "react";
import { DiscountProps } from '../types/Props'

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import DiscountList from '../components/DiscountList';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

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
      }, [discountList])
      

    return (
        <>
            <div className="flex-1">Homepage</div>
            <LoginForm />
            <Slider />
            <DiscountList discountList={discountList} />
        </>
    )
}

export default Home;