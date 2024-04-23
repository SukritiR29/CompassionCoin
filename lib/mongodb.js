import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        
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
