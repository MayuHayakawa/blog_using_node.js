class Article {
    constructor(articleid, userid, time, title, content, like) {
        this.articleid = articleid;
        this.userid = userid;
        this.time = time;
        this.title = title;
        this.content = content;
        this.liked = like;
        this.comment = new Comment;
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