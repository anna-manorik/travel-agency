import { useEffect, useState, useRef } from 'react'
import logo1 from '../img/img01.jpg';
import logo2 from '../img/img02.jpg';
import logo3 from '../img/img03.jpg';
import logo4 from '../img/img04.jpg';
import logo5 from '../img/img05.jpg';
import logo6 from '../img/img06.jpg';
import logo7 from '../img/img07.jpg';

const Slider = () => {
    const [currentImgId, setCurrentImgId] = useState(1);
    const [autoSlide, setAutoSlide] = useState(false);
    const listItems = useRef<HTMLImageElement[]>([]);
    const numbers = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]

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
            {numbers.map((number, index) => (
            <li key={index} className='flex justify-center'>
                <img
                src={number}
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