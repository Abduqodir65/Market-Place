import mongoose from "mongoose";
import { config } from "dotenv";
config();

const mongo_url = process.env.DB_URL;

export const connectDB = async () => {
    mongoose.connect(mongo_url)
        .then(() => console.log("Database connected succesfully"))
        .catch((error) => console.log(`Database error: ${error}`));
}
