import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
}).catch((error) => {
    console.log("Error in DB connection");
})

export default db;