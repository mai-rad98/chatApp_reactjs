import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB =  async () =>{
try {
    console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
} catch (error) {
    console.log("connection failed", error)
}
}
export default connectDB;