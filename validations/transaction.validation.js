const Joi = require('joi');

const depositSchema = Joi.object({
  amount: Joi.number().min(1).required(),
});

const withdrawSchema = Joi.object({
  amount: Joi.number().min(1).required(),
});

module.exports = {
  depositSchema,
  withdrawSchema,
};
