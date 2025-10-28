import joi from 'joi';

export const customerSchema = {
  register: joi.object({
    name: joi.string().required().min(2).max(50),
    email: joi.string().required().email(),
    phone: joi.string().required().pattern(/^\+998\d{9}$/),
    password: joi.string().required().min(6)
  }),
  
  login: joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
  }),
  
  update: joi.object({
    name: joi.string().min(2).max(50),
    email: joi.string().email(),
    phone: joi.string().pattern(/^\+998\d{9}$/),
    password: joi.string().min(6)
  })
};

export const addressSchema = {
  create: joi.object({
    name: joi.string().required().min(2).max(50),
    phone: joi.string().required().pattern(/^\+998\d{9}$/),
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
  }),
  
  update: joi.object({
    name: joi.string().min(2).max(50),
    phone: joi.string().pattern(/^\+998\d{9}$/),
    email: joi.string().email(),
    password: joi.string().min(6)
  })
};

export const districtSchema = {
  create: joi.object({
    name: joi.string().required().min(2).max(50),
    phone: joi.string().required().pattern(/^\\+998\\d{9}$/),
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
  }),
  
  update: joi.object({
    name: joi.string().min(2).max(50),
    phone: joi.string().pattern(/^\\+998\\d{9}$/),
    email: joi.string().email(),
    password: joi.string().min(6)
  }).min(1)
};

// Staff validation
export const staffSchema = {
  register: joi.object({
    name: joi.string().required().min(2).max(50),
    email: joi.string().required().email(),
    phone: joi.string().required().pattern(/^\\+998\\d{9}$/),
    password: joi.string().required().min(6),
    role: joi.string().valid('staff','manager','admin')
  }),
  login: joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
  }),
  update: joi.object({
    name: joi.string().min(2).max(50),
    email: joi.string().email(),
    phone: joi.string().pattern(/^\\+998\\d{9}$/),
    role: joi.string().valid('staff','manager','admin')
  }).min(1)
};

// Order item validation
export const orderItemSchema = {
  create: joi.object({
    order: joi.string().required(),
    productName: joi.string().required(),
    quantity: joi.number().required().min(1),
    price: joi.number().required().min(0)
  }),
  update: joi.object({
    productName: joi.string(),
    quantity: joi.number().min(1),
    price: joi.number().min(0)
  }).min(1)
};

// Order validation
export const orderSchema = {
  create: joi.object({
    customer: joi.string().required(),
    address: joi.string().required(),
    items: joi.array().items(joi.object({ productName: joi.string().required(), quantity: joi.number().required().min(1), price: joi.number().required().min(0) })).required(),
    notes: joi.string().allow('', null)
  }),
  update: joi.object({
    status: joi.string().valid('pending','confirmed','shipped','delivered','cancelled'),
    staff: joi.string(),
    notes: joi.string().allow('', null)
  }).min(1)
};

// Payment validation
export const paymentSchema = {
  create: joi.object({
    order: joi.string().required(),
    amount: joi.number().required().min(0),
    method: joi.string().valid('card','cash','transfer').required(),
    transactionId: joi.string().allow('', null)
  })
};