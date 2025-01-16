import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import blacklisttokenModel from "../models/blacklisttoken.model.js";
import { publishToQueue, subscribeToQueue } from "../../ride/service/rabbit.js";
import EventEmitter from 'events';


const rideEventEmitter = new EventEmitter();


export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Email, password, and name are required",
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ email, password: hash, name });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token);

        delete newUser._doc.password;

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }),
            console.log(error);
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel
            .findOne({ email })
            .select('+password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete user._doc.password;

        res.cookie('token', token);

        res.send({ token, user });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

}


export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




export const acceptedRide = async (req, res) => {
    try {
        rideEventEmitter.once('ride-accepted', (data) => {
            res.send(data);
        })

        setTimeout(() => {
            res.status(204).send();
        }, 30000)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


subscribeToQueue('ride-accepted', async (msg) => {
    const data = JSON.parse(msg);
    rideEventEmitter.emit('ride-accepted', data);
})


