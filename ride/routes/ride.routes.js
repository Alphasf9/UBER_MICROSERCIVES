import express from 'express';
import { captainAuth, userAuth } from '../middleware/auth.middleware.js';
import { createRide } from '../controller/ride.controller.js';
const router = express.Router();



router.post('/create-ride',userAuth,createRide)

router.put('/accept-ride',captainAuth)



export default router