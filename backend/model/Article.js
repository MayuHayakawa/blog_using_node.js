class Article {
    constructor(articleid, userid, time, title, content, liked, comment) {
        this.articleid = articleid;
        this.userid = userid;
        this.time = time;
        this.title = title;
        this.content = content;
        this.liked = liked;
        this.comment = comment;
    }
}

class Comment {
    constructor(userid, username, time, content) {
        this.userid = userid;
        this.username = username;
        this.time = time;
        this.content = content;
    }
}

export { Article, Comment}

// // mongo DB
// import mongoose from "mongoose";

// const ArticleSchema = new mongoose.Schema({
//     articleid: {
//         type: String,
//         required: true,
//     },
//     userid: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     liked: {
//         type: Array,
//         required: true,
//     },
//     comment: {
//         type: Array,
//         required: true,
//     },
// });

// const Article = mongoose.model("Article", ArticleSchema);
// export default Article