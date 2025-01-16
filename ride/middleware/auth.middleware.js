import jwt from 'jsonwebtoken'
import axios from 'axios';


export const userAuth= async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = await axios.get(`${process.env.BASE_URL}/user/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user=response.data;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
        
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


export const captainAuth=async(req, res,next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const captain=response.data;
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}