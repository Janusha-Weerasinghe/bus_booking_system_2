const Joi = require ('joi');

exports.signupSchema = Joi.object({
    NICnumber: Joi.string().required().min(10).max(15),
    fullName: Joi.string().required().min(3).max(100),
    email: Joi.string().min(6).max(60).required().email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'))
        .messages({
            'string.pattern.base': 'Password must have at least 8 characters, one uppercase, one lowercase, and one digit or special character.',
        }),
    roleID: Joi.string().required(),
    contactNumber: Joi.string().optional().min(10).max(15),
});



exports.signinSchema = Joi.object({
    email:Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
        tlds:{allow:['com','net']},

    }),
    password:Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
))
    .message('password bla bala')
})




