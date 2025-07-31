

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from '../img/logo.jpg';
import facebook from '../img/facebook.svg';
import instagram from '../img/instagram.svg';
import telegram from '../img/telegram.svg';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useAuth } from '../context/AuthContext.tsx';
import { clearSearchResults, fetchTours, searchTour, setSelectedTour } from "../redux/slice.ts";
import { ToursProps } from "../types/Props.tsx";
import { debounce } from 'lodash';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isSearchResult, setIsSearchResult] = useState(false)
    const [isCartFull, setIsCartFull] = useState(false)
    const location = useLocation();
    const items = useSelector((state: RootState) => state.cart.items);
    const { userData } = useAuth()
    const dispatch = useDispatch<AppDispatch>();
    const searchedToursList = useSelector((state: RootState) => state.search.searchedTours);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const toggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        dispatch(fetchTours())

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
        setIsSearchResult(false);
        dispatch(clearSearchResults());
        setSearchValue('')
    }, [location.pathname]);

    useEffect(() => {
      setIsCartFull(items.length === 0 ? false : true)
    }, [items])

    useEffect(() => {
      setIsSearchResult(searchedToursList.length === 0 ? false : true)
    }, [searchedToursList])

    const handleSearchTour = debounce((searchValue: string) => {
      setSearchValue(searchValue)
      dispatch(searchTour(searchValue))

      if(searchValue === '') {
        setIsSearchResult(false)
        dispatch(clearSearchResults());
      }
    }, 200)

    const handleOpenInfo = (tour: ToursProps) => {
      dispatch(setSelectedTour(tour))
      navigate('/tour-info')
    }

    return (
        <header className="flex flex-wrap items-center justify-between bg-white shadow-lg px-4 py-4 max-w-screen-xl mx-auto border-b-4 border-yellow-400 rounded-b-xl gap-y-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="w-24 md:w-32 lg:w-40 hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Cart Icon - always visible */}
          <div className="order-3 md:order-none md:ml-auto px-4 relative">
            <div className={isCartFull ? 'w-6 h-6 rounded-full text-sm text-white bg-red-500 absolute -top-1 -right-1 flex items-center justify-center' : 'hidden'}>
              {items.length}
            </div>
            <NavLink to="/cart" className="text-4xl hover:scale-110 transition-transform">
              🛒
            </NavLink>
          </div>

          {/* Message Icon - for users */}
          <div className="relative order-3 md:order-none px-4">
            <div className="w-6 h-6 absolute -top-1 -right-1 rounded-full text-sm text-white bg-red-500 flex items-center justify-center">
              <span>{userData.messageList?.filter(message => !message.readed).length || 0}</span>
            </div>
            <NavLink to="/messages" className="text-4xl hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="40px" height="40px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 10h12v2H6v-2zm0-3h12v2H6V7z"/>
              </svg>
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

          {/* Search Input */}
          <div className="order-4 md:order-none w-full md:w-auto px-4">
            <input
              value={searchValue}
              type="text"
              placeholder="Пошук туру"
              onChange={(e) => handleSearchTour(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 text-lg"
            />
            <ul className={isSearchResult ? 'block absolute border border-gray-300 bg-white p-5' : 'hidden'}>{searchedToursList.map(tour => (<li className="text-lg cursor-pointer border-b-4" onClick={() => handleOpenInfo(tour)}>{tour.title} - <span className="text-orange-800">{tour.price} EUR</span></li>))}
            </ul>
            {searchValue && searchedToursList.length === 0 ? <div className="block absolute border border-gray-300 bg-white p-5">Any results</div> : false}
          </div>

          {/* Navigation */} 
          <nav
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } w-full md:w-auto md:flex md:items-center order-5 md:order-none`}
            id="mobile-menu"
          >
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 text-lg font-semibold w-full md:w-auto text-center">
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
                      `px-4 py-2 block rounded-xl transition duration-300 ${
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
              {userData.role === 'admin' && 
              [
                { to: "/admin", label: "Admin Panel" },
                { to: "/chat", label: "Admin Chat" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 block rounded-xl transition duration-300 ${
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
          <div className="hidden md:flex flex-col text-base font-medium text-right mr-6">
            <a href="tel:+380999999999" className="hover:text-yellow-600">
              📞 +380999999999
            </a>
            <a href="mailto:tour@tour.com" className="hover:text-yellow-600">
              ✉️ tour@tour.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagram} alt="Instagram" className="w-8 hover:scale-110 transition-transform" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebook} alt="Facebook" className="w-7 hover:scale-110 transition-transform" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              <img src={telegram} alt="Telegram" className="w-8 hover:scale-110 transition-transform" />
            </a>
          </div>
        </header>
      );
      
}

export default Header