class User {
    constructor(userid, username, email, password, articles, like) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
        this.articles = articles;
        this.like = like;
    }
}

export default User;