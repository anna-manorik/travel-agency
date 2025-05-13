import Slider from '../components/Slider'
import LoginForm from '../components/LoginForm';
import { useEffect, useState } from "react";
import { DiscountProps } from '../types/Props'

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';
import DiscountList from '../components/DiscountList';

import logo1 from '../img/img01.jpg';
import logo2 from '../img/img02.jpg';
import logo3 from '../img/img03.jpg';
import logo4 from '../img/img04.jpg';
import logo5 from '../img/img05.jpg';
import logo6 from '../img/img06.jpg';
import logo7 from '../img/img07.jpg';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

const Home = () => {
    const [discountList, setDiscountList] = useState<DiscountProps[]>([])
    const photoList = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]
    
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
            <Slider photoList={photoList} />
            <DiscountList discountList={discountList} />
        </>
    )
}

export default Home;