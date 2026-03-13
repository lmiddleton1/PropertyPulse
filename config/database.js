import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // If the database is already connected dont connect again

    if (connected) {
        console.log('\x1b[32m%s\x1b[0m', '✔ MongoDB is connected');
        return;
    }

    // Connect to MongoDB

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;

    } catch (error) {
        console.log(error);

    }
};

export default connectDB;