import { error } from '../utils/response.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error: validationError } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      const errors = validationError.details.map(error => error.message);
      return error(res, 'Validation failed', 400, errors);
    }

    next();
  };
};
