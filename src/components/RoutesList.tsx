import Home from "../pages/Home";
import Tours from "../pages/Tours";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import SignupForm from '../pages/SignupForm'
import Cart from '../pages/Cart'
import TourInfo from '../pages/TourInfo'
import { Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";


const RoutesList = () => {
    return (
            <Routes>
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/tour-info' element={<TourInfo />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
    )
}

export default RoutesList

