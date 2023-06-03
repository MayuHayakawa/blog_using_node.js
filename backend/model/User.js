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

// // mongo DB
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     userid: {
//         type: String,
//         required: true,
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     articles: {
//         type: Array,
//         required: true,
//     },
//     like: {
//         type: Array,
//         required: true,
//     },
// });

// const User = mongoose.model("User", UserSchema);
// export default User