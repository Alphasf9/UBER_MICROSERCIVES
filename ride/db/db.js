import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("RIDE SERVICES ARE CONNECTED TO DATABASE"))
    .catch((err) => console.log(err));
}


export default connect
