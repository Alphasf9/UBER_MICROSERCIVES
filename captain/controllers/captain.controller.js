import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import blacklisttokenModel from "../models/blacklisttoken.model.js";


export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Email, password, and name are required",
            });
        }

        const captain = await captainModel.findOne({ email });

        if (captain) {
            return res.status(400).json({
                success: false,
                message: "captain already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const newCaptain = await captainModel.create({ email, password: hash, name });

        const token = jwt.sign(
            { id: newCaptain._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token);

        delete newCaptain._doc.password;

        return res.status(201).json({
            success: true,
            message: "Captain registered successfully",
            newCaptain,
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
        const captain = await captainModel
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, captain.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete captain._doc.password;

        res.cookie('token', token);

        res.send({ token, captain });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

}


export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: 'captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProfile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


