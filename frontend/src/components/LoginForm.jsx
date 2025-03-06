import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export function LoginForm({ }) {

    const [userdata, setuserdata] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    async function loginsubmit(e) {
        e.preventDefault();
        console.log(userdata);
        try {
            const response = await axios.post("http://localhost:3000/user/login", userdata);

            if (response.data.success) {
                // alert("login success");
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
            // console.log(userdata)




        } catch (error) {
            console.error("Error during register:", error);
        }
    }

    // function goToHomePage() {
    //     navigate("/home");
    // }
    const changhandler = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }
    function togglePassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Login Your  Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Plan your trip with ease</p>
                </div>

                <form className="space-y-4" onSubmit={loginsubmit}>


                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none peer"
                            placeholder="you@arethebest.com"
                            required
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            value={userdata.email}
                            onChange={changhandler}
                        />
                        <span className="hidden text-sm text-red-500 peer-invalid:block">
                            Please enter a valid email address.
                        </span>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1 relative">
                        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            name="password"
                            placeholder="Enter your password"
                            value={userdata.password}
                            onChange={changhandler}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-4 top-10 text-gray-500"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-2.286.766-4.39 2.04-6.045m4.565 12.185a10.05 10.05 0 004.32 1.525M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.02 0-2.007-.145-2.948-.417"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">
                            DOn't  have an account?{" "}
                            <Link to="/register" className="text-blue-500 hover:underline">
                                Register
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        //     <div className="mx-auto max-w-lg text-center">
        //         <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>

        //         <p className="mt-4 text-gray-500">
        //             Welcome back! Please sign in below.
        //         </p>
        //     </div>
        //     <form className="group mx-auto mb-0 mt-8 max-w-md" onSubmit={loginsubmit}>
        //         <div className="my-4">
        //             <label htmlFor="email" className="font-medium py-4">Email</label>
        //             <div className="relative">
        //                 <input
        //                     type="email"
        //                     name="email"
        //                     className="
        //                             w-full rounded-lg border p-4 pe-12 text-sm shadow-sm
        //                             peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        //                     placeholder="you@arethebest.com"
        //                     required
        //                     pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
        //                     value={userdata.email}
        //                     onChange={changhandler}
        //                 />
        //                 <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        //                     Please enter a valid email address
        //                 </span>
        //             </div>
        //         </div>
        //         <div className="my-4">
        //             <div className="my-1">
        //                 <label htmlFor="password" className="font-medium">Password</label>
        //             </div>
        //             <div className="relative">
        //                 <input
        //                     type={showPassword ? 'text' : 'password'}
        //                     className="
        //                         w-full rounded-lg border p-4 pe-12 text-sm shadow-sm
        //                         invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
        //                     placeholder="Enter password"
        //                     value={userdata.password}
        //                     // onChange={event => setPassword(event.target.value)}
        //                     onChange={changhandler}
        //                     name="password"

        //                     required
        //                 />
        //                 <span onClick={togglePassword} className="absolute inset-y-0 end-0 grid place-content-center px-4">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         className="h-4 w-4 text-gray-400"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                         stroke="currentColor"
        //                     >
        //                         <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //                         />
        //                         <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        //                         />
        //                     </svg>
        //                 </span>
        //             </div>
        //         </div>
        //         <div className="flex items-center justify-between">
        //             <p className="text-sm text-gray-500">
        //                 Dont have an account?
        //                 <Link to="/register" className="underline ml-2">Register</Link>
        //             </p>

        //             <button
        //                 className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        //                 type="submit"
        //             >
        //                 Login
        //             </button>
        //         </div>
        //     </form>
        // </div>
    )
}