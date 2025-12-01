import mongoose from "mongoose";


export const connectDB = async ()=> {
     try {
    (await mongoose.connect(process.env.MONGODB_URL))
    console.log("mongoose connected successfully")
     } catch(err) {
         console.log("mongoose error : ",err)
     }
}



