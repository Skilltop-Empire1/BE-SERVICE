const Joi = require('joi');

const serviceSchema = Joi.object({
    serviceName: Joi.string().required().messages({
        'any.required': 'service Name is required.',
        'string.base': 'service Name must be a string.'
    }),
    price: Joi.string().required().messages({
        'any.required': 'price is required.',
        'string.base': 'price must be a string.'
    }),
    duration: Joi.string().required().messages({
        'any.required': 'duration  is required.',
        'string.base': '  duration must be a valid string.'
    }),
    serviceManager: Joi.string().required().messages({
        'any.required': 'serviceManager  is required.',
    }),
    phoneNumber: Joi.string().optional(),
    description: Joi.string().optional(),
    // dateAdded: Joi.string().optional()
});

module.exports = { serviceSchema };