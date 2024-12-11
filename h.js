

const loginJWTAthentication = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  let token
  if (authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verify the token
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verify)
    

    const {id,email,role,permission,username} = verify
    console.log("verify",verify,id,email,role,permission, username)
    req.user = {userId:id,email,role,permission,username}
    next();  
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid token" });
  }
};

module.exports = loginJWTAthentication;
