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