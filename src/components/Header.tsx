

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
        <header className="flex justify-between items-center bg-white shadow-lg px-6 py-4 max-w-screen-xl mx-auto border-b-4 border-yellow-400 rounded-b-xl">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={logo} className="w-16 md:w-24 lg:w-32 hover:scale-105 transition-transform duration-300" alt="Logo" />
            </Link>
          </div>
      
          {/* Mobile Toggle Button */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="block h-0.5 bg-black"></span>
            <span className="block h-0.5 bg-black"></span>
            <span className="block h-0.5 bg-black"></span>
          </button>
      
          {/* Navigation */}
          <nav
            className={`${isMobileMenuOpen ? "absolute top-20 left-4 bg-white p-6 rounded-lg shadow-md border border-yellow-400 z-50" : "hidden"} md:block`}
            id="mobile-menu"
          >
            <ul className={`flex flex-col md:flex-row md:items-center md:gap-6 text-base font-medium`}>
              {[
                { to: "/", label: "Main" },
                { to: "/tours", label: "Tours" },
                { to: "/about", label: "About Us" },
                { to: "/contacts", label: "Contacts" },
                { to: "/signup", label: "Sign Up" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded transition duration-300 ${
                        isActive ? "text-yellow-500 font-bold" : "text-gray-700 hover:text-yellow-600"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/cart" className="text-2xl hover:scale-110 transition-transform">
                  🛒
                </NavLink>
              </li>
            </ul>
          </nav>
      
          {/* Contact Info */}
          <div className="hidden md:flex flex-col text-sm text-right mr-4">
            <a href="tel:+380999999999" className="hover:text-yellow-600">
              📞 +380999999999
            </a>
            <a href="mailto:tour@tour.com" className="hover:text-yellow-600">
              ✉️ tour@tour.com
            </a>
          </div>
      
          {/* Social Icons */}
          <div className="hidden md:flex gap-3 items-center">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagram} alt="Instagram" className="w-6 hover:scale-110 transition-transform" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebook} alt="Facebook" className="w-5 hover:scale-110 transition-transform" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              <img src={telegram} alt="Telegram" className="w-6 hover:scale-110 transition-transform" />
            </a>
          </div>
        </header>
      );
      
}

export default Header