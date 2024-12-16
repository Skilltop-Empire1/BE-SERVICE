const Joi = require("joi");

// Joi Validation Schema
const taskValidationSchema = Joi.object({
  taskTitle: Joi.string()
    .required()
    .messages({
      "string.empty": "Task title is required",
    }),
  
  priority: Joi.string()
    .valid("Low", "Medium", "High")
    .required()
    .messages({
      "any.only": "Priority must be one of ['Low', 'Medium', 'High']",
    }),
  
  dueDate: Joi.date()
    .iso()
    .required()
    .messages({
      "date.format": "Due date must be a valid ISO date",
    }),
  
  taskStatus: Joi.string()
    .valid("To do", "In Progress", "Completed", "Cancelled")
    .default("To do")
    .messages({
      "any.only": "Task status must be one of ['To do', 'In Progress', 'Completed', 'Cancelled']",
    }),
  
  description: Joi.string()
    .allow(null, "")
    .messages({
      "string.base": "Description must be a string",
    }),
  
  fileUrl: Joi.string()
    .uri()
    .allow(null)
    .messages({
      "string.uri": "File URL must be a valid URI",
    }),
  
});

module.exports = taskValidationSchema;
