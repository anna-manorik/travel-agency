import { useEffect, useState, useRef } from 'react'

type SliderProps = {
    photoList: string[];
  };

const Slider = ({ photoList }: SliderProps) => {
    const [currentImgId, setCurrentImgId] = useState(1);
    const [autoSlide, setAutoSlide] = useState(false);
    const listItems = useRef<HTMLImageElement[]>([]);
    

    useEffect(() => {
        listItems.current = Array.from(document.querySelectorAll(".slider-img"));
        listItems.current.forEach((img, index) => {img.id = String(index + 1)});
    }, [])

    useEffect(() => {
        const currentImg = listItems.current[currentImgId - 1];
        if(currentImg) {
            listItems.current.forEach(img => img.classList.remove('active'));

            currentImg?.classList.add('active')
        }
    }, [currentImgId])

    useEffect(() => {
        if (!autoSlide) return;
        const interval = setInterval(() => {
          slideNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [autoSlide, currentImgId]);

    function slideNext () {
        if(currentImgId >= listItems.current.length) {
            setCurrentImgId(1)
        } else {
            setCurrentImgId((prev) => prev + 1)
        }
    }

    function slidePrev () {
        if(currentImgId === 1) {
            setCurrentImgId(listItems.current.length)
        } else {
            setCurrentImgId((prev) => prev - 1)
        }
    }

    return (
        <div className='flex flex-col'>
        <ul id="slider">
            {photoList?.map((photo, index) => (
            <li key={index} className='flex justify-center'>
                <img
                src={photo}
                alt=""
                className={`slider-img ${index === currentImgId ? 'active' : ''}`}
                />
            </li>
            ))}
        </ul>
        <div id="slide-buttons">
            <button onClick={slidePrev}>&#10094;</button>
            <button onClick={slideNext}>&#10095;</button>
            <button onClick={() => setAutoSlide(true)}>Auto</button>
            <button onClick={() => setAutoSlide(false)}>Stop</button>
        </div>
    </div>
    )
} 

export default Slider