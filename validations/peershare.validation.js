const Joi = require("joi");

const depositSchema = Joi.object({
  id: Joi.string().required(),
  amount: Joi.number().min(1).required(),
});

const joinRoomSchema = Joi.object({
  roomPassword: Joi.string().required(),
});

const createRoomSchema = Joi.object({
  roomName: Joi.string().required(),
  paymentTerm: Joi.number().required(),
  creditRequirement: Joi.string().required(),
  maxMember: Joi.number().min(1).required(),
  paymentTermUnit: Joi.string().required(),
  typeRoom: Joi.string().required(),
  private: Joi.boolean().required(),
  roomPassword: Joi.string(),
  bidTimeOut: Joi.string().required(),
  startBidDate: Joi.date().required(),
});

module.exports = {
  depositSchema,
  joinRoomSchema,
  createRoomSchema,
};
