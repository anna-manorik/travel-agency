import Home from "../pages/Home";
import Tours from "../pages/Tours";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import SignupForm from '../pages/SignupForm'
import Cart from '../pages/Cart'
import { Routes, Route } from "react-router-dom";


const RoutesList = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
    )
}

export default RoutesList

