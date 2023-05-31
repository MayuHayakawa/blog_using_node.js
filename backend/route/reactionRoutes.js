import express from "express";
import { toggleLike, addComment } from "../controller/reactionController.js";

const router = express.Router();

router.put("/like", toggleLike);
router.post("/comment", addComment);

export default router;