import ToursList from "../components/ToursList";
import { ToursProps } from '../types/Props'
import { useEffect, useState } from "react";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, auth, db}

const Tours = () => {
    const [toursList, setToursList] = useState<ToursProps[]>([])
        
          useEffect(() => {
            const fetchOffers = async () => {
                const querySnapshot = await getDocs(collection(db, 'tours'));
                const discount = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ToursProps[];
                setToursList(discount)
              };
    
            fetchOffers()
          }, [])
    
          useEffect(() => {
          }, [toursList])

    return (
        <>
            <div>Tours</div>
            <ToursList toursList={toursList} />
        </>
    )
}

export default Tours;