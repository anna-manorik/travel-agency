import facebook from '../img/facebook.svg';
import instagram from '../img/instagram.svg';
import telegram from '../img/telegram.svg';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='flex flex-col pt-10'>
            <article>
                <p><b>© 2025 Турфірма "МрійТур". Всі права захищено.</b></p>
                <p>Організовуємо яскраві подорожі по Україні та світу.</p><Link to="/about">Детальніше</Link>
                <p><b>Зв'яжіться з нами:</b><br/>
                    <a href="tel:+380991234567">+38 (099) 123-45-67</a> | <a href="mailto:info@mriytour.ua">info@mriytour.ua</a></p>
                <p>Адреса: м. Київ, вул. Пригодницька, 15</p>
                <p><b>Ми у соцмережах:</b> 
                <span className="flex items-center justify-center">
                    <a href='https://instagram.com' target="_blank"><img src={instagram} className="w-10 " /></a>
                    <a href='https://facebook.com' target="_blank"><img src={facebook} className="w-6" /></a>
                    <a href='https://t.me' target="_blank"><img src={telegram} className="w-7" /></a>
                </span>
                </p>
                <p>
                    <a href="/privacy-policy.html">Політика конфіденційності</a> | 
                    <a href="/terms.html">Умови користування</a>
                </p>
            </article>
        </footer>
    )
}

export default Footer