import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        mongoose.connection.on("error", (error) => {
            console.error("Error connecting to MongoDB:", error);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
