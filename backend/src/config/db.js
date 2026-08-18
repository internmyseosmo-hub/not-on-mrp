import mongoose from "mongoose";
import dns from "dns";

// Fix for Windows DNS resolution issue with mongodb+srv SRV records
try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
    // Fallback if DNS override fails
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "website",
        });
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;


