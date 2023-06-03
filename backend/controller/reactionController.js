import fs from "fs-extra";
import dt from "date-utils";
import { Comment } from "../model/Article.js";

const toggleLike = (req, res) => {
    try {
        const { userid, articleid } = req.body;

        const userData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const myData = userData.find((user) => user.userid === userid);
        const article = articlesData.find((article) => article.articleid === articleid);

        if(myData.like !== undefined) {
            // console.log("like list before: " + myData.like);
            const usersLikeList = myData.like;
            if(usersLikeList.includes(articleid)) {
                // console.log("there is same articleid in user like list");
                const usersIndex = usersLikeList.indexOf(articleid);
                usersLikeList.splice(usersIndex, 1);
                // console.log("like list after(remove): " + usersLikeList);
                const newUserData = userData.map((user) => {
                    if(user.userid === userid) {
                        return { ...user, like: usersLikeList };
                    }
                    return user
                });
                fs.writeFileSync("users.json", JSON.stringify(newUserData));
            } else {
                // console.log("there is not the articleid in user like list");
                usersLikeList.push(articleid);
                console.log("like list after(add): " + usersLikeList);
                const newUserData = userData.map((user) => {
                    if(user.userid === userid) {
                        return { ...user, like: usersLikeList };
                    }
                    return user
                });
                fs.writeFileSync("users.json", JSON.stringify(newUserData));
            }
        } else {
            console.log("there is any articleids in user like list")
            const newUserData = userData.map((user) => {
                if(user.userid === userid) {
                    return { ...user, like: [articleid] };
                }
                return user
            });
            fs.writeFileSync("users.json", JSON.stringify(newUserData));
        };

        if(article.liked !== undefined) {
            const articleLikedList = article.liked;

            if(articleLikedList.includes(userid)) {
                const articleIndex = articleLikedList.indexOf(userid);
                articleLikedList.splice(articleIndex, 1);
                const newArticlesData = articlesData.map((article) => {
                    if(article.articleid === articleid) {
                        return { ...article, liked: articleLikedList };
                    }
                    return article
                });
                fs.writeFileSync("articles.json", JSON.stringify(newArticlesData));
            } else {
                articleLikedList.push(userid);
                const newArticlesData = articlesData.map((article) => {
                    if(article.articleid === articleid) {
                        return { ...article, liked: articleLikedList };
                    }
                    return article
                });
                fs.writeFileSync("articles.json", JSON.stringify(newArticlesData));
            }
        } else {
            const newArticlesData = articlesData.map((article) => {
                if(article.articleid === articleid) {
                    return { ...article, liked: [userid] };
                } return article
            });
            fs.writeFileSync("articles.json", JSON.stringify(newArticlesData));
        };

        res.status(201).json({
            message: "updataed user's like list and articke liked list",
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const addComment = (req, res) => {
    try {
        const { articleid, userid, username, time, content } = req.body;
        const articlesData = JSON.parse(fs.readFileSync("articles.json", "utf-8"));
        const article = articlesData.find((article) => article.articleid === articleid);
        const commentList = article.comment;
        // const now = new Date();
        // const time = now.toFormat("YYYY/MM/DD HH24:MI");

        const newCommentList = new Comment(userid, username, time, content);
        commentList.push(newCommentList);
        articlesData.map((article) => {
            if(article.articleid === articleid) {
                return { ...article, comment: commentList };
            };
            return article
        });
        fs.writeFileSync("articles.json", JSON.stringify(articlesData));

        res.status(201).json({
            message: "posted new comment",
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export { toggleLike, addComment }