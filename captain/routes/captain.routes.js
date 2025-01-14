import express from 'express';

const router = express.Router();
import {getProfile, login, logout, register} from '../controllers/captain.controller.js'
import { captainAuth } from '../middlewares/authMiddleware.js';


router.post('/register',register)

router.post('/login',login)

router.get('/logout',logout)

router.get('/profile',captainAuth,getProfile)

export default router



