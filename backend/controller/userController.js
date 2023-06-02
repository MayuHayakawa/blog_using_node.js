import fs from "fs-extra";

const getMyInfo = (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body); //{}

        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const myInfo = usersData.find((user) => user.email === email);
        console.log("email: " + email); //email: undefined
        console.log("myInfo: " + myInfo); //myInfo: undefined

        res.status(200).json({
            message: "User profile",
            user: myInfo
        });
    } catch(error) {
        res.status(500).json({
            message: "Internal server error at userController",
        })
    }
}

export { getMyInfo }