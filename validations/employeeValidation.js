const Joi = require("joi");

const userValidationSchema = Joi.object({
 
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),

  firstName: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "First name must be a string",
    }),

  lastName: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Last name must be a string",
    }),

  // password: Joi.string()
  //   .min(8)
  //   .required()
  //   .messages({
  //     "string.min": "Password must be at least 8 characters long",
  //     "any.required": "Password is required",
  //   }),

  dept: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Department must be a string",
    }),

  phoneNo: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "Phone number must be a valid international number",
    }),

  employeeType: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Employee type must be a string",
    }),

  status: Joi.string()
    .valid("Active", "Busy", "Offline")
    .default("Active")
    .messages({
      "any.only": "Status must be one of ['Active', 'Busy', 'Offline']",
    }),

  task: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Current task must be a string",
    }),

  note: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Additional notes must be a string",
    }),

  profileUrl: Joi.string()
    .uri()
    .allow(null, "")
    .messages({
      "string.uri": "Profile URL must be a valid URI",
    }),

  role: Joi.string()
    .valid("Employee", "Manager", "Super Admin")
    .default("Super Admin")
    .messages({
      "any.only": "Role must be one of ['Employee', 'Manager', 'Super Admin']",
    }),

  orgId: Joi.string()
    .uuid()
    .allow(null)
    .messages({
      "string.guid": "Organization ID must be a valid UUID",
    }),
});

module.exports = userValidationSchema;
