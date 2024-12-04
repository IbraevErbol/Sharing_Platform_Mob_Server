import mongoose from 'mongoose'

const URL = 'mongodb://localhost:27017/NativeDB'

export const connectDB = async() => {
    try {
        await mongoose.connect(URL);
        console.log('Connect to NativeDB');
    } catch (error) {
        console.log(`DB connection error: ${error}`);
        process.exit(1);
    }
}