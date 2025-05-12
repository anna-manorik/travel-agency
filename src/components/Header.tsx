

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
        <header className="flex flex-wrap items-center justify-between bg-white shadow-lg px-4 py-3 max-w-screen-xl mx-auto border-b-4 border-yellow-400 rounded-b-xl">
  {/* Logo */}
  <div className="flex items-center">
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="w-20 md:w-28 lg:w-36 hover:scale-105 transition-transform duration-300"
      />
    </Link>
  </div>

  {/* Cart Icon - always visible */}
  <div className="order-3 md:order-none md:ml-auto px-4">
    <NavLink to="/cart" className="text-3xl hover:scale-110 transition-transform">
      🛒
    </NavLink>
  </div>

  {/* Mobile Toggle Button */}
  <button
    className="md:hidden order-2 w-7 h-6 flex flex-col justify-between ml-auto mr-4"
    onClick={toggleMenu}
    aria-label="Toggle Menu"
  >
    <span className="block h-0.5 bg-black"></span>
    <span className="block h-0.5 bg-black"></span>
    <span className="block h-0.5 bg-black"></span>
  </button>

  {/* Navigation */}
  <nav
    className={`${
      isMobileMenuOpen ? 'block' : 'hidden'
    } w-full md:w-auto md:flex md:items-center order-4 md:order-none`}
    id="mobile-menu"
  >
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 text-base font-medium w-full md:w-auto text-center">
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
              `px-3 py-2 block rounded transition duration-300 ${
                isActive
                  ? "text-yellow-500 font-bold"
                  : "text-gray-700 hover:text-yellow-600"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>

  {/* Contact Info */}
  <div className="hidden md:flex flex-col text-sm text-right mr-6">
    <a href="tel:+380999999999" className="hover:text-yellow-600">
      📞 +380999999999
    </a>
    <a href="mailto:tour@tour.com" className="hover:text-yellow-600">
      ✉️ tour@tour.com
    </a>
  </div>

  {/* Social Icons */}
  <div className="hidden md:flex items-center gap-4">
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <img src={instagram} alt="Instagram" className="w-7 hover:scale-110 transition-transform" />
    </a>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <img src={facebook} alt="Facebook" className="w-6 hover:scale-110 transition-transform" />
    </a>
    <a href="https://t.me" target="_blank" rel="noreferrer">
      <img src={telegram} alt="Telegram" className="w-7 hover:scale-110 transition-transform" />
    </a>
  </div>
</header>

      );
      
}

export default Header