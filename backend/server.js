import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/DBconnect.js'
import authRoutes from './routes/authRoutes.js';


//config
dotenv.config();

//initalize app
const app = express();

const PORT  = process.env.PORT


//middleware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth",authRoutes)


app.listen(PORT,() =>{ 
    console.log('Server is running on port '+ PORT)
    connectDB()
});