import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully...");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectionDB;
