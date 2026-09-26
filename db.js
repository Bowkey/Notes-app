import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful to MongoDB")
  } catch (error) {
    console.error(error.message);
    throw new Error("couldn't Connect to DB");
    process.exitCode = 1;
  }
}

export default connectDB;