// importing needed library
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");

// create and assign authorize token
const loginJWTAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    let token;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied" });
    }
    token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verify);

        const { userId, email } = verify; // assign payload
        console.log("verify", verify, userId, email);
        
        // Optional: Fetch user from the database
        const user = await User.findOne({where: userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user; // Attach the user object to the request
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Invalid token" });
    }
};

module.exports = {
    loginJWTAuth,
};

