import React from "react";
import { useSelector } from "react-redux";
import { FaBell } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();


    function logout() {
        // setUser(null)
        localStorage.clear();
        navigate("/login")
    }

    return (
        <>
            <nav className="bg-blue-500 text-white p-4 flex justify-between">
                <Link to="/" className="text-xl font-bold">Tourism Booking</Link>
                <div className="flex items-center gap-4">
                    <span>Welcome, {user?.username}</span>
                    {/* Bell Icon for Bookings Page */}
                    <button onClick={() => navigate('/bookings')}>
                        <FaBell className="text-white text-xl" />
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>Logout</button>
                </div>
            </nav>
        </>
    )
}


export default Navbar;