// Import required modules
const Joi = require("joi");

// validation functions
const subscriptionValidation = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  amount: Joi.string().required(),
  subs: Joi.string().required(),
  phone: Joi.string().required(),
});


module.exports = {
  subscriptionValidation
}

