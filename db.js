import mongoose from "mongoose"
import dotenv from "dotenv"
import dns from "node:dns";

dotenv.config();

const connectDB = async () => {

  try {
        dns.setServers(["1.1.1.1", "8.8.8.8"]);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful to MongoDB")
  } catch (error) {
    console.error(error.message);

    process.exitCode = 1;
  }
}

export default connectDB;