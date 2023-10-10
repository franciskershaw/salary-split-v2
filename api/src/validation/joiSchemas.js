import Joi from 'joi';

const createUserSchema = Joi.object({
  username: Joi.string().max(30).required().regex(/^\S+$/),
  name: Joi.string().max(30).required(),
  password: Joi.string().max(20).required().min(6),
});

const loginUserSchema = Joi.object({
  username: Joi.string().max(30).required().regex(/^\S+$/),
  password: Joi.string().max(20).required(),
});

const editUserSchema = Joi.object({
  monthlySalary: Joi.number().min(0).optional(),
  balanceAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  billsAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
}).min(1);

const addAccountSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  availableInPayDay: Joi.boolean().required(),
});

const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  availableInPayDay: Joi.boolean().optional(),
  includeInTotal: Joi.boolean().optional(),
})
  .min(1)
  .or('name', 'amount', 'availableInPayDay', 'includeInTotal');

const addTransactionSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  sendToAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid('bill', 'savings').required(),
});

const updateTransactionSchema = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  sendToAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  type: Joi.string().valid('bill', 'savings').optional(),
})
  .min(1)
  .or('name', 'amount', 'sendToAccount', 'type');

export {
  createUserSchema,
  loginUserSchema,
  editUserSchema,
  addAccountSchema,
  updateAccountSchema,
  addTransactionSchema,
  updateTransactionSchema,
};
