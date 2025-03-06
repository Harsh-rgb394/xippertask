const express=require("express");
const Router=express.Router();
const {loginController,registerController,Getuserdetails,bookingController,getallbookings,checkinController}=require("../Controllers/userController");
const authMiddleware = require("../Middlware/authMiddleware");


Router.post("/login",loginController);
Router.post("/register",registerController);
Router.get("/authdetails",authMiddleware,Getuserdetails);
Router.post("/booking",authMiddleware,bookingController);
Router.post("/getallbookings",authMiddleware,getallbookings);
Router.post("/checkin",authMiddleware,checkinController);



module.exports=Router;