import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Captain', captainSchema);