import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Redux/Features/userSlice"
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";


export default function ProtectedRouter({ children }) {


  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ Use navigate hook
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/authdetails",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        navigate("/login");  // ✅ Redirect using navigate, not <Navigate />
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
      navigate("/login");  // ✅ Redirect on error
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);  // ✅ Don't put getUser in dependency array

  if (localStorage.getItem("token")) {
    return children;  // ✅ If token is there, allow access
  } else {
    return <Navigate to="/login" />;  // ✅ If no token, redirect to login
  }

};