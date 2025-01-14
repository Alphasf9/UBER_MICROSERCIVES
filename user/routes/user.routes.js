import express from 'express';

const router = express.Router();
import {getProfile, login, logout, register} from '../controllers/user.controller.js'
import { userAuth } from '../middlewares/authMiddleware.js';


router.post('/register',register)

router.post('/login',login)

router.get('/logout',logout)

router.get('/profile',userAuth,getProfile)

export default router



