import ToursList from "../components/ToursList";
import Filters from '../components/Filters'
// import { ToursProps } from '../types/Props'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { fetchTours } from '../redux/slice.ts'

const Tours = () => {
    const dispatch = useDispatch<AppDispatch>();
    const toursList = useSelector((state: RootState) => state.tours.filteredTours);
    
    useEffect(() => {
        dispatch(fetchTours());
    }, []);
    
    return (
        <>
            <div>Tours</div>
            <Filters />
            <ToursList toursList={toursList} />
        </>
    )
}

export default Tours;

