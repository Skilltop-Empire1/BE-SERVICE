// Import modules
const { User, Organization,  Code, Payment} = require("../models");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userValidation = require("../validations/userValidation");
const nodemailer = require("nodemailer");
const randomText = require("../middlewares/randomText");
const { where, Op } = require("sequelize");
const { notifyUsers } = require("../controllers/notificationsController"); // adjust the path

require("dotenv").config();

// **************************************************************************************
// Creating the users object
class UserClass {
  // welcome  method
  welcome = async (req, res, err) => {
    const getUser = await User.findAll();
    if (err) {
      console.log(err);
    }
    res.json(getUser);
  }; //end of welcom method

  // ****************************************************************************************
  signup = async (req, res) => {
    const { email, password, username, subCode, name } = req.body;

    const authorizedUser = true;
    if (!authorizedUser) {
      return res
        .status(403)
        .json({ msg: "New users not allowed, Please contact support" });
    }
    // validate users
    // const { error } = userValidation.userValidation.validate(req.body);
    // if (error) {
    //   return res.status(404).json(error.details[0].message);
    // }

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
    
    //checking if the subscription code exist
    // const codeExist = await Code.findOne({where: {code:subCode}})
    // if(!codeExist){
    //   return res.status(404).json({msg: "Invalid subscription code"})
    // }
    // if (codeExist.email !== email || codeExist.businessName !== username ){
    //   return res.status(404).json({msg: "Email or business name is not subscribed"})
    // }

    // creating organization name
    const createOrg = await Organization.create({ name: username });

    // create user if not found
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      email: email,
      password: hashedPassword,
      orgId: createOrg.orgId,
    });
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
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare password
    const matchPassword = await bcrypt.compare(
      password,
      userIsRegistered.password
    );
    if (!matchPassword) {
      return res
        .status(400)
        .json({ msg: "You have entered incorrect login details" });
    }
//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
if (userIsRegistered.isFirstLogin) {
  // Update isFirstLogin flag
  await userIsRegistered.update({ isFirstLogin: false });
const message = `User ${userIsRegistered.firstName || email} has logged in for the first time.`;
// Fetch all users with role Super Admin, Admin, or Manager.
const notifyRoles = ["Super Admin"];
const usersToNotify = await User.findAll({
where: { role: notifyRoles },
attributes: ["userId"],
});
const recipientIds = usersToNotify.map((u) => u.userId);
await notifyUsers(recipientIds, message, { type: "firstLogin", user: userIsRegistered });
}
//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]    
    

    // Create signin token
    const accessToken = jwt.sign(
        { id: userIsRegistered.userId, email: userIsRegistered.email,permission:userIsRegistered.permission },
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

  // Forgot passworn functionaluty *******************************************************
  forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
      const { error } = userValidation.forgotPasswordValidation.validate(
        req.body
      );
      if (error) {
        return res.status(404).json(error.details[0].message);
      }

      //check if user exist
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ msg: "User does not exist" });
      }

      // const passwordLink = "www.gmail.com";
      // let randomText = await randomPassText.generateRandomPassword(50);
      let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com", //mail.skilltopims.com
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      //     const formLink = ""

      let mailOptions = await {
        from: {
          name: "SERVICE PASSWORD RESET LINK",
          address: process.env.EMAIL_USER,
        },
        to: user.email,
        subject: "Service Password Reset link",
        text: `You have made a request to change a password. Kindly Click on the link to proceed with the password reset`,
        html: ` <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your IMS account. If you made this request, please click the button below to reset your password:</p>
        <a href="${process.env.CLIENT2_URL}/passwordConfirmation?token=${randomText}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Best regards,<br/>App Service Support Team</p>
        </div>`,
      };
      res.json({
        msg: "An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.",
      });
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }

  };

  resetPassword = async (req, res)=>{
    const { email, newPassword } = req.body;
      //validate details
      const { error } = userValidation.newPasswordValidation.validate(req.body);
      if (error) {
        return res.status(404).json(error.details[0].message);
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send("Incorrect email ID");
      }
      const hash = await bcrypt.hash(newPassword, 10);
      const updatePassword = await User.update(
        { password: hash },
        { where: { email: email } }
      );
      try {
        if (!updatePassword) {
          return res.status(404).json({ msg: "Password reset failed" });
        } else {
          console.log(updatePassword);
          res.status(201).json({ msg: "Password updated successfully" });
          // return res.redirect('https://www.example.com')
          return;
        }
      } catch (error) {
        throw error;
      }
  } //reset password closing tag


  // change password functionality ********************************************
  changePassword = async (req, res) =>{
    const { password, confirmPassword } = req.body
    try {
      //validate details
      const { error } = userValidation.changePasswordValidation.validate(req.body);
      if (error) {
        return res.status(404).json(error.details[0].message);
      }
      const {email} = req.user
      
      const user = User.findOne({where: {email}})
      if(!user){
        res.status(404).json({msg: "User does not exist"})
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Password mismatch" });
        }

      //update password
      const hash = await bcrypt.hash(password, 10);
      const updatepassword = await User.update(
        { password: hash }, { where: { email: email } 
      });  
      if(updatepassword){
        return res
          .status(200)
          .json({ msg: "User password updated successfully" });
      }else{
        return res
          .status(404)
          .json({ msg: "Password update failed" });
      }
    } catch (error) {
      throw error      
    }
  }// end of method

  // **************************************************
  updateUser = async (req, res) =>{
    const { firstName, lastName, department, phoneNo } = req.body

    try {
      //validate details
      const { error } = userValidation.updateUserValidation.validate(req.body);
      if (error) {
        return res.status(404).json(error.details[0].message);
      }

      const {email} = req.user
      const user = User.findOne({where: {email}})
      if(!user){
        res.status(404).json({msg: "User does not exist"})
      }
      const updateUserDetails = await User.update(
        { firstName, lastName, department, phoneNo }, { where: { email: email } 
      });
      if(updateUserDetails){
        return res.status(201).json({mse: "User details updated sucessfully"})
      }
      return res.status(404).json({msg: "update not successful"})
  
    } catch (error) {
      throw error
    }
      
    


  } //end of method

} //class end
// instance of class creation
const usersClass = new UserClass();
module.exports = usersClass;













