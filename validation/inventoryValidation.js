const Joi = require('joi');

const inventorySchema = Joi.object({
    itemName: Joi.string().required().messages({
        'any.required': 'itemName is required.',
        'string.base': 'itemName must be a string.'
    }),
    category: Joi.string().required().messages({
        'any.required': 'category is required.',
        'string.base': 'category must be a string.'
    }),
    itemId: Joi.string().required().messages({
        'any.required': 'itemId  is required.',
        'string.base': '  itemId must be a valid string.'
    }),
    quantity: Joi.number().required().messages({
        'any.required': 'serviceManager  is required.',
         'string.base': '  quantity must be a number.'
    }),
    totalValue: Joi.number().required().messages({
        'any.required': 'totalValue  is required.',
         'string.base': '  totalValue must be a number.'
    }),
    assignedTo: Joi.string().required().messages({
        'any.required': 'assignedTo  is required.',
        'string.base': '  assignedTo must be a valid string.'
    }),
    datePurchased: Joi.date().required().messages({
        'any.required': 'assignedTo  is required.',
        'string.base': '  assignedTo must be a valid date format.'
    }),
    note: Joi.string().optional(),
});

module.exports = { inventorySchema };