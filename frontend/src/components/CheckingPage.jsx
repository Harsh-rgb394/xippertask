import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
const CheckingPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [familyMembers, setFamilyMembers] = useState([{ name: '', aadhaarNumber: '' }]);


    const addFamilyMember = () => {
        setFamilyMembers([...familyMembers, { name: '', aadhaarNumber: '' }]);
    };

    const handleChange = (index, key, value) => {
        const updatedMembers = [...familyMembers];
        updatedMembers[index][key] = value;
        setFamilyMembers(updatedMembers);
    };

    const handleSubmit = async () => {
        console.log(familyMembers);

        try {
            const repsonse = await axios.post("http://localhost:3000/user/checkin", { bookingId, familyMembers }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (repsonse.data.success) {
                setFamilyMembers([]);
                alert(repsonse.data.message);

                navigate("/");
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">

                <Navbar />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Web Check-In</h2>
                    {familyMembers.map((member, index) => (
                        <div key={index} className="space-y-2">
                            <input
                                className="p-2  mt-2 border rounded w-full"
                                placeholder="Family Member Name"
                                value={member.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                            <input
                                className="p-2 mt-2  border rounded w-full"
                                placeholder="Aadhaar Number"
                                value={member.aadhaarNumber}
                                onChange={(e) => handleChange(index, 'aadhaarNumber', e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={addFamilyMember} className="mt-4 mr-4 bg-blue-500 text-white px-3 py-1 rounded">
                        + Add Family Member
                    </button>
                    <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-3 py-1 rounded">
                        Submit Check-In
                    </button>
                </div>
            </div>
        </>
    )
}


export default CheckingPage;