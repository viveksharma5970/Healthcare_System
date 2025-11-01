import mongoose from "mongoose";

export const connectDB = async () => {

    const DATABASE_URL = `mongodb+srv://viveksharma5970_db_user:${process.env.DB_PASSWORD}@cluster0.wpoesbf.mongodb.net/?appName=Cluster0`
    try {
        const connection = await mongoose.connect(`${DATABASE_URL}`);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch(error) {
        console.log("MongoDB connection error: ", error.message);
    }
}