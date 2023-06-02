import fs from "fs-extra";
import uniqid from "uniqid";
import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userid = uniqid();
        const articles = [];
        const like = [];

        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        if(usersData.find((user) => user.email === email)) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = hashPassword(password);
        hashedPassword.then((hashedPassword) => {
            const newUser = new User(userid, username, email, hashedPassword, articles, like);
            usersData.push(newUser);
            fs.writeFileSync("users.json", JSON.stringify(usersData));
            res.status(201).json({
                message: "User created successfully",
                user: newUser
            });
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error at authController"
        });
    }
};

const loginController = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));        
        const user = usersData.find((user) => user.email === email);
        
        if(!user) {
            return res.status(401).json({
                message: "Invalid email",
            });
        }

        const compareResult = comparePassword(password, user.password);
        compareResult.then((compared) => {
            if(!compared) {
                return res.status(401).json({
                    message: "Invalid password",
                });
            }

            const token = generateToken({
                userid: user.userid,
                username: user.username,
                email: user.email,
                articles: user.articles,
                like: user.like,
            });

            res.status(200).json({
                message: "Login successfully",
                token: token,
                user: user
            });
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error at authController",
        });
    }
}

export { registerController, loginController };