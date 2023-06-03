import express from "express";
import { getAllArticles, getArticle, createArticle, updataArticle, deleteArticle } from "../controller/articleController.js"; 

const router = express.Router();

router.get("/all", getAllArticles);
router.post("/get", getArticle);
router.post("/new", createArticle);
router.put("/updata", updataArticle);
router.post("/delete", deleteArticle);

export default router;