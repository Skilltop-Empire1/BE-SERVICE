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

// Forgot passworn functionaluty
forgotPassword = async (req, res) => {
  const { email } = req.body;

  const { error } = userValidation.forgotPasswordValidation.validate(req.body);
  if (error) {
    return res.status(404).json(error.details[0].message);
  }

  //check if user exist
  const user = await userModel.User.findOne({
    where: { email },
  });
 
try {
  if (!user) {
    return res.status(404).json({ msg: "User does not exist" });
  }
} catch (error) {
  console.log (error)
  
}
    // const passwordLink = "www.gmail.com";
//     let randomText = await randompassword.generateRandomPassword(50);
//     let transporter = await  nodemailer.createTransport({
//       host: "mail.skilltopims.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     const formLink = ""

//     let mailOptions = await {
//       from: {
//         name: "IMS password reset link",
//         address: process.env.EMAIL_USER,
//       },
//       to: user.email,
//       subject: "IMS Reset link",
//       text: `You have made a request to change a password. Kindly Click on the link to proceed with the password reset`,
//       html:` <div style="font-family: Arial, sans-serif; color: #333;">
//         <h2>Password Reset Request</h2>
//         <p>Hello,</p>
//         <p>We received a request to reset your password for your IMS account. If you made this request, please click the button below to reset your password:</p>
//         <a href="${process.env.CLIENT2_URL}/passwordConfirmation?token=${randomText}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
//         <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
//         <p>Best regards,<br/>IMS Support Team</p>
//         </div>`,
     
//     };

//     res.json({
//       msg: "An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.",
//     });

//     return await transporter.sendMail(mailOptions);
//   } catch (error) {
//     throw error;
//   }
// };

// //**********route to submit reset password and redirect to login */

// resetSubmit = async (req, res) => {
//   const { email, password, confirmPassword } = req.body;
// //validate details
//   const { error } = userschema.validatePasswordReset.validate(req.body);
//   if (error) {
//     return res.status(404).json(error.details[0].message);
//   }
//   const user = await userModel.User.findOne({ where: { email } });
//   if (!user) {
//     return res.status(400).send("Enter a correct email address");
//   }
//   if (password !==confirmPassword){
//     return res.json({msg: "Password mismatch"})
//   }
//   const hash = await bcrypt.hash(password, 10);
//   const updatePassword = await userModel.User.update(
//     { password: hash },
//     { where: { email: email } }
//   );
//   try {
//     if (!updatePassword) {
//       return res.status(404).json({ msg: "Password reset failed" });
//     } else {
//       console.log(updatePassword);
//       res.status(201).json({ msg: "Password updated successfully" });
//       // return res.redirect('https://www.example.com')
//       return
//     }
//   } catch (error) {
//     throw error;
//   }
};



}
const usersClass = new UserClass();
module.exports = usersClass;




