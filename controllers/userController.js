// Import modules
const { User, Organization } = require("../models");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const userValidation = require("../validations/userValidation");


// **************************************************************************************
// Creating the users object
class UserClass {
  // welcome  method
  welcome = async (req, res, err) => {
    const getUser = await User.findAll()
    if (err){console.log(err)}
    res.json(getUser);
  }; //end of welcom method

  // ****************************************************************************************
  signup = async (req, res) => {
    const { email, password, username } = req.body;

    const authorizedUser = true;
    if (!authorizedUser) {
      return res
        .status(403)
        .json({ msg: "New users not allowed, Please contact support" });
    }
    // validate users
    const { error } = userValidation.userValidation.validate(req.body);
    if (error) {
      return res.status(404).json(error.details[0].message);
    }

     // Check the organization if exist
     const orgExist = await Organization.findOne({
      where: { name: username },
    });
    // checking for existing users
    const userExist = await User.findOne({
      where: { email: email },
    });
    try {
      if (orgExist || userExist) {
        return res
          .status(404)
          .json({ msg: "A User with these details already exists" });
      }
    } catch (error) {
      throw error;
    }

    // creating organization name
    const createOrg = await Organization.create({name:username})
   
    // create user if not found
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({email: email, password: hashedPassword,orgId:createOrg.orgId});
    try {
      if (createOrg && createUser) {
        console.log(createOrg, createUser);
        res.status(201).json({ msg: "User created successfully" });
        return createOrg, createUser;
      }
    } catch (error) {
      throw error;
    }
  }; // end of signup method

  //*********************************************************************************** */
  signin = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    const { error } = userValidation.loginValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user exists
    const userIsRegistered = await User.findOne({ where: { email } });
    if (!userIsRegistered) {
        return res.status(400).json({ msg: "User not found" });
    }

    // Compare password
    const matchPassword = await bcrypt.compare(password, userIsRegistered.password);
    if (!matchPassword) {
        return res.status(400).json({ msg: "You have entered incorrect login details" });
    }

    // Create signin token
    const accessToken = jwt.sign(
        { id: userIsRegistered.userId, email: userIsRegistered.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    // Send response
    res.status(200).json({
        accessToken,
        id: userIsRegistered.userId,
        email: userIsRegistered.email,
        role: userIsRegistered.role,
    });
};



}
const usersClass = new UserClass();
module.exports = usersClass;





