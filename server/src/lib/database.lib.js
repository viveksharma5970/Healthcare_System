import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch(error) {
        console.log("MongoDB connection error: ", error.message);
    }
}