import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getUsersForSideBar,getMessages ,sendMessage} from '../controller/messageController.js';

const router = express.Router();

router.get("/user",protectRoute,getUsersForSideBar)

router.get("/:id",protectRoute,getMessages)

router.post("/send/:id",protectRoute,sendMessage)

export default router;