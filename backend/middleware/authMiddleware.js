import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const protectRoute = async (req,res,next) =>{
    try{

        // check token
        const token = req.cookies.jwt
        console.log("Cookies:", req.cookies); // Debugging

        if(!token){
            return res.status(401).json({message : "Unauthorized No Token Provided"})
        }


      //verify token
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      if (!decoded){
          return res.status(401).json({message : "Unauthorized Token Verification Failed"})
      }
      console.log("Decoded Token:", decoded); // Debugging


      const user = await User.findById(decoded.userId).select("-password")  //exclude password
      if(!user){
          return res.status(404).json({message : "User not found"})
      }
      req.user = user
      next()

    }catch(error){
        console.log("Error in protectRoute: ",error.message)
        res.status(500).json({message : "Server error"})
    }
}