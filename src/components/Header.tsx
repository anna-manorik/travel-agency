

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from '../img/logo.jpg';
import facebook from '../img/facebook.svg';
import instagram from '../img/instagram.svg';
import telegram from '../img/telegram.svg';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation();

    const toggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          const menu = document.getElementById("mobile-menu");
          if (menu && !menu.contains(e.target as Node)) {
            setMobileMenuOpen(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    useEffect(() => {
        closeMobileMenu();
    }, [location.pathname]);

    return (
        <header className="flex justify-between items-center bg-white shadow-md p-4 w-1200 border-4 border-yellow-400">
            <div><Link to="/"><img src={logo} className="block w-16 md:w-32 lg:w-48" /></Link></div>
            <button className="flex flex-col justify-between w-6 h-5 md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
                <span className="block h-0.5 bg-black"></span>
                <span className="block h-0.5 bg-black"></span>
                <span className="block h-0.5 bg-black"></span>
            </button>
            <nav className={isMobileMenuOpen ? 'sm:flex absolute top-50px left-10' : 'hidden md:flex'} id='mobile-menu'>
                <ul className={isMobileMenuOpen ? 'flex-col bg-white p-10 border-2 border-yellow-400' : 'hidden md:flex justify-center gap-8 text-lg font-medium'}>
                    <li>
                        <NavLink to="/" className={({ isActive }) =>
                            `px-4 py-2 font-semibold transition duration-300 ${
                            isActive ? "text-red-500" : "text-black"
                            }`
                        }>Головна</NavLink>
                    </li>
                    <li>
                        <NavLink  to="/tours" className={({ isActive }) =>
                            `px-4 py-2 font-semibold transition duration-300 ${
                            isActive ? "text-red-500" : "text-black"
                            }`
                        }>Тури</NavLink >
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) =>
                            `px-4 py-2 font-semibold transition duration-300 ${
                            isActive ? "text-red-500" : "text-black"
                            }`
                        }>Про нас</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacts" className={({ isActive }) =>
                            `px-4 py-2 font-semibold transition duration-300 ${
                            isActive ? "text-red-500" : "text-black"
                            }`
                        }>Контакти</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-col">
                <a href="tel:+380999999999"><span className="before:content-['📞'] before:mr-2"> <p className="hidden md:block">+380999999999</p></span></a>
                <a href="mailto:tour@tour.com"><span className="before:content-['✉️'] before:mr-2"> <p className="hidden md:block">tour@tour.com</p></span></a>
            </div>
            <div className="flex flex-col items-center">
                <a href='https://instagram.com'><img src={instagram} className="w-10 " /></a>
                <a href='https://facebook.com'><img src={facebook} className="w-6" /></a>
                <a href='https://t.me'><img src={telegram} className="w-7" /></a>
            </div>
        </header>
    )
}

export default Header