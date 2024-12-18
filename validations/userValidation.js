// Import required modules
const Joi = require("joi");

// validation functions
const userValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
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
  newPassword: Joi.string().required()
})

module.exports = {
    userValidation,
    loginValidation,
    forgotPasswordValidation,
    newPasswordValidation
}