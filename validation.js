const Joi = require('@hapi/joi')

const regSchema = Joi.object({
	name: Joi.string().max(255).required(),
	email: Joi.string().required().email(),
	password: Joi.string().min(6).required()
})

const logSchema = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().min(6).required()
})

const regValidation = (obj) => {
	return regSchema.validate(obj)
}

const logValidation = (obj) => {
	return logSchema.validate(obj)
}

module.exports.regValidation = regValidation
module.exports.logValidation = logValidation