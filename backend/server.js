import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConnect.js'
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import {app,server} from './config/socket.js'
import path from 'path'
//config
dotenv.config();

//initalize app

const PORT  = process.env.PORT

const  __dirname = path.resolve()


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

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"))
    })
}

server.listen(PORT,() =>{ 
    console.log('Server is running on port '+ PORT)
    connectDB()
});