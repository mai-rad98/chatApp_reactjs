import express from 'express';
import { signUp, signIn, logOut , updateProfile,checkAuth} from '../controller/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/signup",signUp)

router.post("/login",signIn)

router.post("/logout",logOut);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)

export default router;