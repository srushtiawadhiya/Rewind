import mongoose from "mongoose";

const connectDB = async () =>{
    try {

        mongoose.connection.on('connected',() => console.log("Databse Connected Successfully"))
          await mongoose.connect(`${process.env.MONGODB_URI}/ReWind`)
    }catch(error){
        console.log(error.message);
    }
}

export default connectDB;