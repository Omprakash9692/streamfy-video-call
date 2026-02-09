import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
        console.log(`Mongodb Connected: ${conn.connection.host}`);
        
    }catch(error){
        console.log("error connected to mongodb",error);
        process.exit(1);
        
    }
}