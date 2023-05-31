import fs from "fs-extra";
import uniqid from "uniqid";
import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userid = uniqid();

        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        if(usersData.find((user) => user.email === email)) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = hashPassword(password);
        hashedPassword.then((hashedPassword) => {
            const newUser = new User(userid, username, email, hashedPassword);
            usersData.push(newUser);
            fs.writeFileSync("users.json", JSON.stringify(usersData));
            res.status(201).json({
                message: "User created successfully",
                user: {
                    userid: newUser.userid,
                    username: newUser.username,
                    email: newUser.email,
                },
            });
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const loginController = (req, res) => {
    try {
        const { email, password } = req.body;
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        console.log(usersData);
        const user = usersData.find((user) => user.email === email);
        if(!user) {
            return res.status(401).json({
                message: "Invalid email",
            });
        }

        const compareResult = comparePassword(password, user.password);

        compareResult.then((compared) => {
            console.log(compared);
            if(!compared) {
                return res.status(401).json({
                    message: "Invalid password",
                });
            }

            const token = generateToken({
                userid: user.iserid,
                username: user.username,
                email: user.email,
            });

            res.status(200).json({
                message: "Login successfully",
                token,
                user: {
                    userid: user.userid,
                    username: user.username,
                    email: user.email,
                },
            });
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export { registerController, loginController };