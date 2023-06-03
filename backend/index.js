import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./route/authRoutes.js";
import useRoutes from "./route/userRoutes.js";
import articleRoutes from "./route/articleRoutes.js";
import reactionRoutes from "./route/reactionRoutes.js";
import cors from "cors";
// import db from "./db/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const server = express();
server.use(bodyParser.json({ extended: true })); // { exteneds: true }でpostで取得したデータを配列にする
server.use(cors());

server.get("/blog", (req, res) => {
    res.status(200).json({
        message: "Server is running",
        author: "admin"
    })
})

server.use("/api/auth", authRoutes);
server.use("/api/user", useRoutes);
server.use("/api/article", articleRoutes);
server.use("/api/reaction", reactionRoutes);

server.listen(PORT, () => {
    console.log(`Server is runnning on ${PORT}`);
})
