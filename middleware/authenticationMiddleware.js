// importing needed library
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {User} = require("../models");

const loginAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  let token
  if (authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1]
  }
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verify)
    const {userId,email} = verify
    console.log("verify",verify,userId,email)
    req.user = {userId,email}
    next();  
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid token" });
  }
};
module.exports = loginAuth;
