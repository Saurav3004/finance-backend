import mongoose from "mongoose";

export const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI,{
        dbName:"finance"
    });
    console.log(connect.connection.host)
}