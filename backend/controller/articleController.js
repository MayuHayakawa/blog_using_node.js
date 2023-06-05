import fs from "fs-extra";
import User from "../model/User.js";
import { Article } from "../model/Article.js";
import uniqid from "uniqid";
import dt from "date-utils";

const getAllArticles = async (req, res) => {
    try {
        const allArticles = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        // mongo DB
        // const allArticles = await Article.find();
        res.status(200).json({
            message: "Get all articles",
            articles: allArticles,
        });
    } catch(error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getArticle = async (req, res) => {
    try {
        const { articleid } = req.body;
        const articleData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const article = articleData.find((article) => article.articleid === articleid);
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const author = usersData.find((user) => user.userid === article.userid);
        // mongo DB
        // const article = await Article.find({ articleid: articleid });
        // const author = await User.find({ articleid: articleid });

        res.status(200).json({
            message: "Get the articles",
            article: article,
            author: author
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const createArticle = async (req, res) => {
    try {
        const { articleid, userid, time, title, content, liked, comment } = req.body;
        
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const user = usersData.find((user) => user.userid === userid);
        // mongo DB
        // const user = await User.find();

        const newArticle = new Article( articleid, userid, time, title, content, liked, comment);

        articlesData.push(newArticle);
        fs.writeFileSync("articles.json", JSON.stringify(articlesData));
        // mongo DB
        // newArticle.save();

        const usersArticleList = await user.articles;
        usersArticleList.push(articleid);
        const newUsersData = usersData.map((user) => {
            if(user.userid === userid) {
                return { ...user, articles: usersArticleList };
            }
            return user
        });
        fs.writeFileSync("users.json", JSON.stringify(newUsersData));
        // mongo DB (error)
        // await user.update({ userid: userid }, { $addToSet: { articles: articleid }});

        res.status(201).json({
            message: "posted new article successfully",
            article: newArticle,
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
        console.log(articleid, title, content);

        const newArticlesData = articlesData.map((article) => {
            if(article.articleid === articleid) {
                return { ...article, title: title, content: content, time: time }
            }
            return article
        });

        fs.writeFileSync("articles.json", JSON.stringify(newArticlesData));
    
        res.status(200).json({
            message: "put the article successfully",
            // article: newArticlesData
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
        // const { userid, articleid } = req.body;
        // console.log(req.body);
        // console.log(userid);
        console.log(articleid);

        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const article = articlesData.find((article) => article.articleid === articleid);
        const userData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        // const myData = userData.find((user) => user.userid === userid);

        const articleIndex = articlesData.indexOf(article);
        articlesData.splice(articleIndex, 1);
        fs.writeFileSync("articles.json", JSON.stringify(articlesData));

        userData.map((user) => {
            if(user.articles != undefined) {
                if(user.articles.includes(articleid)) {
                    user.articles = user.articles.filter((item) => item != articleid);
                }
            }
            if(user.like != undefined) {
                if(user.like.includes(articleid)) {
                    user.like = user.like.filter((item) => item != articleid);
                }
            }
        })

        fs.writeFileSync("users.json", JSON.stringify(userData));
        
        // if(myData.articles != undefined && myData.like != undefined) {
        //     const userArticleList = myData.articles;
        //     const userArticleIndex = userArticleList.indexOf(articleid);
        //     userArticleList.splice(userArticleIndex, 1);

        //     const userLikeList = myData.like;
        //     const userLikeIndex = userLikeList.indexOf(articleid);
        //     userLikeList.splice(userLikeIndex, 1);

        //     const newUsersData = userData.map((user) => {
        //         if(user.userid === userid) {
        //             return { ...user, articles: userArticleList, like: userLikeList };
        //         }
        //         return user;
        //     });

        //     fs.writeFileSync("users.json", JSON.stringify(newUsersData));
        // };
        


        res.status(200).json({
            message: "deleted the article successfully",
            article: articlesData,
            user : userData
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export { getAllArticles, getArticle, createArticle, updataArticle, deleteArticle }