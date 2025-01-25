// Import required modules
const Joi = require("joi");

// validation functions
const subscriptionValidation = Joi.object({
  businessName: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscribedPlan: Joi.string().required(),
  subscriptionCode: Joi.string().required(),
});

module.exports = {
  subscriptionValidation
}