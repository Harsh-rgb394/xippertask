import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../Redux/Features/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export function Home() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    console.log(user);
    const [hotels, sethotels] = useState([]);




    const fetchallhotels = async (req, res) => {
        try {
            const response = await axios.get("/Hotel.json");
            console.log(response.data);

            if (response) {
                sethotels(response.data);
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        fetchallhotels();
    }, [])


    const bookingbutton = (hotel) => async () => {
        try {
            const response = await axios.post("http://localhost:3000/user/booking", {
                userId: user.id,
                hotelId: hotel.id,
                hotelName: hotel.name,
                hotelLocation: hotel.location,
                hotelPrice: hotel.price
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if (response.data.success) {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>

            <div className="min-h-screen bg-gray-100 p-4">
                {/* <nav className="bg-blue-500 text-white p-4 flex justify-between">
                    <h1 className="text-xl font-bold">Tourism Booking</h1>
                    <div className="flex gap-4">
                        <span>Welcome, {user?.username}</span>
                        <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>Logout</button>
                    </div>
                </nav> */}
                <Navbar />

                <div className="container mx-auto mt-4">
                    <h2 className="text-2xl font-bold mb-4">Available Hotels</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hotels.map(hotel => (
                            <div key={hotel.id} className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                <p>Location: {hotel.location}</p>
                                <p>Price: ₹{hotel.price}/night</p>
                                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded" onClick={bookingbutton(hotel)}>
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}