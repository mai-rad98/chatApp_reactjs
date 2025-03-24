import User from "../models/userModel.js"
import cloudinary from "../config/cloudinary.js"
import Message from "../models/messsageModel.js"

export const getUsersForSideBar = async (req, res) => {
    try{
          const loggedInUser = req.user._id
          const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")
          res.status(200).json(filteredUsers)
    }catch(error){
        console.log(error.message ,"Error in getting users for sidebar")
        res.status(500).json({message : "Server Error"})

    }
}

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


export const sendMessage = async (req, res) => {
    try{
        const {text,image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let imageurl
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageurl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageurl
        })
        await newMessage.save()
        res.status(200).json(newMessage)

        //TODO: REAL TIME FUNCTIONALITY SOCKECT.IO
    }catch(error){
        console.log(error.message ,"Error in sending messages")
        res.status(500).json({message : "Server Error"})
    }
}