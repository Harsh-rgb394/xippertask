const bcrypt=require("bcrypt");
const {prisma}=require("../PrismaClient/Prismaclient"); 
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

const jwt=require("jsonwebtoken");


const loginController=async(req,res)=>{
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(406).json({ message: 'Please provide an email.' })
        }

        if(!password) {
            return res.status(406).json({ message: 'Please provide a password.' })
        }

         const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch =  bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({message:"Success login",success:true,token});

    } catch(error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const registerController=async(req,res)=>{

    const { username, email, password } = req.body;
    console.log(username,email,password);
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' })
        }

        if (!email) {
            return res.status(406).json({ message: 'Please provide an email.' })
        }

        if (!username) {
            return res.status(406).json({ message: 'Please provide a username.' })
        }

        if (!password) {
            return res.status(406).json({ message: 'Please provide a password.' })
        }

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 12)
            }
        })

        // const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // res.json({ user })

        if(user){
            res.status(200).json({message:"regsiter success",success:true});
        }
    } catch(error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' })
    }
 

}


const Getuserdetails=async(req,res)=>{

try {
    const user = await prisma.user.findUnique({
        where:{
            id:req.userId
        }
    });
  
    user.password = undefined;
    if (!user) {
      res.status(404).send({
        message: "user does not exist ",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
    });
  }
}


const bookingController=async(req,res)=>{
    

    console.log(req.body);

    try {
        const bookings=await prisma.bookers.create({ 
            data:{
                userId:req.body.userId,
                hotelId:req.body.hotelId,
                hotelName:req.body.hotelName,
                hotelLocation:req.body.hotelLocation,
                hotelPrice:req.body.hotelPrice
            }
          })

        if(bookings){
            res.status(200).json({message:"Booking Successfull",success:true});
        }
        
    } catch (error) {
        console.log(error);
        
    }


}

const getallbookings=async(req,res)=>{
    const {userId}=req.body;

    try {
        const bookings=await prisma.bookers.findMany({
            where:{
                userId:userId

            }
        });
        res.status(200).json({message:"All bookings",success:true,data:bookings});
        
    } catch (error) {
        console.log(error);
        
    }

}


const checkinController=async(req,res)=>{
    const {bookingId,familyMembers}=req.body;
    // console.log(req.body);
    try {
        const checkins = await Promise.all(
            familyMembers.map((member) =>
                prisma.webCheckin.create({
                    data: {
                        bookingId,
                        familyMemberName: member.name,
                        aadhaarNumber: member.aadhaarNumber
                    }
                })
            )
        );
        res.status(201).json({ message: 'Check-in successful', checkins,success:true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create check-ins' });
    }


}
module.exports={loginController,registerController,Getuserdetails,bookingController,getallbookings,checkinController};