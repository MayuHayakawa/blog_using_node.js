import fs from "fs-extra";

const getMyInfo = (req, res) => {
    try {
        const { email } = req.user;
        const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
        const user = usersData.find((user) => user.email === email);

        res.status(200).json({
            message: "User profile",
            user: user
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

export { getMyInfo }