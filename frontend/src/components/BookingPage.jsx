import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const [bookings, setbookings] = useState([]);
    console.log(bookings);
    const navigate = useNavigate();


    const fetchallbookings = async () => {
        try {
            const repsonse = await axios.post("http://localhost:3000/user/getallbookings", { userId: user.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (repsonse.data.success) {
                setbookings(repsonse.data.data);
            }

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        fetchallbookings();
    }, [])

    const handleCheckIn = (id) => {
        navigate(`/checkin/${id}`);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">

                <Navbar />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-4 border rounded shadow bg-white">
                                <h3 className="text-xl font-semibold">{booking.hotelName}</h3>
                                <p>{booking.hotelLocation}</p>
                                <p>Price: ₹{booking.hotelPrice}</p>
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                                    onClick={() => handleCheckIn(booking.id)}
                                >
                                    Check-In
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default BookingPage;



