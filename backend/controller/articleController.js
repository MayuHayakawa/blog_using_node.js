import fs from "fs-extra";
import uniqid from "uniqid";
import dt from "date-utils";
import { Article } from "../model/Article.js";

const getAllArticles = (req, res) => {
    try {
        const articleData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        console.log(articleData);

        res.status(200).json({
            message: "Get all articles",
            articles: articleData,
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getArticle = (req, res) => {
    try {
        // const { userid } = req.body;
        // const articleData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        // const myArticles = articleData.find((article) => article.userid === userid);
        // console.log(myArticles);

        // res.status(200).json({
        //     message: "Get my articles",
        // });
        const { articleid } = req.body;
        const articleData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const article = articleData.find((article) => article.articleid === articleid);

        res.status(200).json({
            message: "Get my articles",
            article: article
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const createArticle = (req, res) => {
    try {
        const { userid, title, content } = req.body;
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const user = usersData.find((user) => user.userid === userid);
        const articleid = uniqid();
        const now = new Date();
        const time = now.toFormat("YYYY/MM/DD HH24:MI");
        const like = [];
        const comment = [];

        const newArticle = new Article(articleid, userid, time, title, content, like, comment);
        articlesData.push(newArticle);
        fs.writeFileSync("articles.json", JSON.stringify(articlesData));

        const usersArticleList = user.articles;
        usersArticleList.push(articleid);
        const newUsersData = usersData.map((user) => {
            if(user.userid === userid) {
                return { ...user, articles: usersArticleList };
            }
            return user
        });
        fs.writeFileSync("users.json", JSON.stringify(newUsersData));

        res.status(201).json({
            message: "posted new article successfully",
            // article: newArticle,
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const updataArticle = (req, res) => {
    try {
        const { articleid, title, content } = req.body;
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const now = new Date();
        const time = now.toFormat("YYYY/MM/DD HH24:MI");

        const newArticlesData = articlesData.map((article) => {
            if(article.articleid === articleid) {
                return { ...article, title: title, content: content, time: time }
            }
            return article
        });

        fs.writeFileSync("articles.json", JSON.stringify(newArticlesData));
    
        res.status(200).json({
            message: "put the article successfully",
            article: {
                articleid: articleid,
                title: title,
            },
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const deleteArticle = (req, res) => {
    try {
        const { articleid } = req.body;
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const article = articlesData.find((article) => article.articleid === articleid);
        const index = articlesData.indexOf(article);
        articlesData.splice(index, 1);
        fs.writeFileSync("articles.json", JSON.stringify(articlesData));

        res.status(200).json({
            message: "deleted the article successfully",
            article: {
                articleid: articleid,
                title: article.title,
            },
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export { getAllArticles, getArticle, createArticle, updataArticle, deleteArticle }