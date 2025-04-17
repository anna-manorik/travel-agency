import logo1 from '../img/img01.jpg';
import logo2 from '../img/img02.jpg';
import logo3 from '../img/img03.jpg';
import logo4 from '../img/img04.jpg';
import logo5 from '../img/img05.jpg';
import logo6 from '../img/img06.jpg';
import logo7 from '../img/img07.jpg';

const Slider = () => {
    const numbers = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const autoBtn = document.getElementById("auto");
const stopBtn = document.getElementById("stop");
const currentImg = document.querySelector('.active');
let slidingLoop: any;

const listItems = document.querySelectorAll(".slider-img");
const images = Array.from(listItems).map((img, index) => img.id = String(index + 1));
let currentImgId = Number(currentImg?.getAttribute('id'))

function slideNext () {
    const currentImg = document.querySelector('.active')
    
    if(currentImgId === listItems.length) {
        currentImg?.classList.remove('active')
        document.getElementById('1')?.classList.add('active')
        currentImgId = 1;
        return
    }

    if(currentImgId < listItems.length) {
        currentImg?.classList.remove('active')
        document.getElementById(String(currentImgId + 1))?.classList.add('active')
        currentImgId += 1;
    }
}

nextBtn?.addEventListener('click', () => {
    slideNext()
})

prevBtn?.addEventListener('click', () => {
    const currentImg = document.querySelector('.active')

    if(currentImgId === 1) {
        currentImg?.classList.remove('active')
        document.getElementById(String(listItems.length))?.classList.add('active')
        currentImgId = listItems.length;
        return
    }

    if(currentImgId <= listItems.length) {
        currentImg?.classList.remove('active')
        document.getElementById(String(currentImgId - 1))?.classList.add('active')
        currentImgId -= 1;
    }
})


autoBtn?.addEventListener ('click', () => {
    slidingLoop = setInterval(() => {
         slideNext()
    }, 2000);
})

stopBtn?.addEventListener ('click', () => {
    clearInterval(slidingLoop)
})


    return (
        <>
        <ul id="slider">
            {numbers.map((number, index) => (<li><img src={number} alt="" className={index === 0 ? 'slider-img active' : 'slider-img'} /></li>))}
        </ul>
        <div id="slide-buttons">
            <button id="prev">&#10094;</button>
            <button id="next">&#10095;</button>
            <button id="auto">Auto</button>
            <button id="stop">Stop</button>
        </div>
    </>
    )
} 

export default Slider