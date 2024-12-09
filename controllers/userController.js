// Import modules
const { User, Organization } = require("../models");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const userValidation = require("../validation/userValidation");

// **************************************************************************************
// Creating the users object
class UserClass {
  // welcome  method
  welcome = async (req, res) => {
    res.json({ msg: "Welcome to our work" });
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
    const createUser = await User.create({email: email, password: hashedPassword});
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

  signin = async () => {}; //end of signin method
}
const usersClass = new UserClass();
module.exports = usersClass;
