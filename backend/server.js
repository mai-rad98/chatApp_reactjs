import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConnect.js'
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import {app,server} from './config/socket.js'

//config
dotenv.config();

//initalize app

const PORT  = process.env.PORT


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({  
    origin: "http://localhost:5173",
    credentials:true
}))
//routes
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


server.listen(PORT,() =>{ 
    console.log('Server is running on port '+ PORT)
    connectDB()
});