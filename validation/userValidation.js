// Import rrequired modules
const Joi = require("joi");

// validation functikons

const userValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports = {
    userValidation
}