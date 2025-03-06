import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./Features/userSlice";

export default configureStore({
    reducer:{
        user:UserSlice.reducer
    }
})