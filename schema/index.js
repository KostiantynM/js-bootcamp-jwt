const Joi = require('joi');

// at least one uppercase
const upperCasePart = '(?=.*[A-Z])';
// at least one lowercase
const lowerCasePart = '(?=.*[a-z])';
// at least one digit
const digitPart = '(?=.*[0-9])';
// at least one special chart
const specialChrPart = '(?=.*[^A-Za-z0-9])';
const strongPswPattern = new RegExp(`^${upperCasePart}${lowerCasePart}${digitPart}${specialChrPart}`);

const signup = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
      .regex(strongPswPattern)
      .min(8)
      .max(20)
      .required(),
  })
};

const signin = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

module.exports = {
  signup,
  signin
}