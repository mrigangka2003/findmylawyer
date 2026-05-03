import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "../constants";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    if (connectionInstance) {
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
}

export default connectDb;