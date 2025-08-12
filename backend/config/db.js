const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;

// mongodb+srv://bhattavitansh:ironman@cluster0.mbeee78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0