import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { ToursListProps, ToursProps } from '../types/Props'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setSelectedTour } from "../redux/slice";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 48.3794, // центр України
  lng: 31.1656,
};

const TourMap = ({ toursList }: ToursListProps ) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCoLvtlGRZSDz-eLBqmvUe1CHZoaSQbyNo",
  });
  const [selected, setSelected] = useState<ToursProps | null>(null);
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleOpenInfo = (tour: ToursProps) => {
        dispatch(setSelectedTour(tour))
        navigate('/tour-info')
    }

  if (!isLoaded) return <p>Завантаження карти...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {toursList.map((tour, i) => (
        <Marker key={i} position={{ lat: tour.lat ?? 0, lng: tour.lng ?? 0 }} title={tour.title} onClick={() => setSelected(tour)} />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat ?? 0, lng: selected.lng ?? 0 }}
          onCloseClick={() => setSelected(null)}
        >
          <div className="p-2 max-w-[200px]">
            <h4 className="font-bold text-xl">{selected.title}</h4>
            <p className="text-lg text-gray-600">{selected.shortDesc}</p>
            <p className="text-lg font-medium text-yellow-600">💰 {selected.price} €</p>
            <button onClick={() => handleOpenInfo(selected)} className="text-blue-600 underline text-xl mt-5 mb-5">
                See tour details...
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default TourMap