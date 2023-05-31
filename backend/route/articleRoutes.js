import express from "express";
import { getAllArticles, getArticles, createArticle, updataArticle, deleteArticle } from "../controller/articleController.js"; 

const router = express.Router();

router.get("/all", getAllArticles);
router.get("/myarticles", getArticles);
router.post("/new", createArticle);
router.put("/updata", updataArticle);
router.delete("/delete", deleteArticle);

export default router;