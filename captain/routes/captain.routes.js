import express from 'express';

const router = express.Router();
import { getProfile, login, logout, register, toggleAvailability, waitingForNewRide } from '../controllers/captain.controller.js'
import { captainAuth } from '../middlewares/authMiddleware.js';


router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.get('/profile', captainAuth, getProfile)

router.patch('/available', captainAuth, toggleAvailability)

router.get('/new-ride', captainAuth, waitingForNewRide)

export default router



