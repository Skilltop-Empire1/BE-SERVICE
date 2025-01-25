// Import required modules
const Joi = require("joi");

// validation functions
const userValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8)
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
  .required(),
  username: Joi.string().min(6).required(),
  subscriptionCode: Joi.string().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required()
})

const newPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8)
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
  .required()
})

const changePasswordValidation = Joi.object({
  password: Joi.string().min(8)
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
  .required(),
  confirmPassword: Joi.string().required()
})

module.exports = {
    userValidation,
    loginValidation,
    forgotPasswordValidation,
    newPasswordValidation,
    changePasswordValidation
}