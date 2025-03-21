
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import {generateToken} from '../config/utils.js'
import cloudinary from '../config/cloudinary.js'

export const signUp = async (req,res) =>{    //request body
const {email,fullName,password} = req.body
    try{

        if(!email || !fullName || !password){
            return res.status(400).json({message : "All fields are required"})
        }
        //check password length
        if(password.length <6 ){
            return res.status(400).json({message : "Password must be 6 character long"})
        }

        //check if user already exists
        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({message : "User already exists"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const newUser = new User({
            email,
            fullName,
            password : hashedPassword
        })
        
        if(newUser){
            //generate token here
           generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({message : "Invalid user data"})
        }

    }catch (error){
        console.log(error.message ,"Error in signing up")
        res.status(500).json({message : "Server Error"})
    }
}

export const signIn = async (req,res) =>{
const {email,password} = req.body
  try{
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message : "User does not exist"})
    }

    //pasword match
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
        return res.status(400).json({message : "Invalid Credentials"})
     }
     //generate token
     generateToken(user._id,res)
        res.status(200).json({
            _id : user._id,
            email : user.email,
            fullName : user.fullName,
            profilePic: user.profilePic,
  })
}
  catch (error){
    console.log(error.message ,"Error in signing in")
    res.status(500).json({message : "Server Error"})
}
}

export const logOut = (req,res) =>{
try{
    res.cookie("jwt","",{maxAge : 0})
    res.status(200).json({message : "Logged out"})

}catch(error){
    console.log(error.message ,"Error in logging out")
    res.status(500).json({message : "Server Error"})
}}


export const updateProfile = async (req,res) =>{

    try{
        const {profilePic} = req.body
        const userId = req.user._id

        //check for profile pic
        if(!profilePic){
            return res.status(400).json({message : "Profile pic is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic : uploadResponse.url},
            {new : true}
        )
        res.status(200).json(updatedUser)
    }catch(error){
        console.log(error.message ,"Error in updating profile")
        res.status(500).json({message : "Server Error"})}
}

export const checkAuth = (req,res) =>{
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log(error.message ,"Error in checking auth")
        res.status(500).json({message : "Server Error"})
    }
}