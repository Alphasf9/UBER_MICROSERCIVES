import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("CAPTAIN SERVICES ARE CONNECTED TO THE DATABASE"))
    .catch((err) => console.log(err));
}


export default connect
