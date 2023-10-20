const joi = require('joi')

const userValidation = (req, res, next) => {
    const { body } = req;
    const userschema = joi.object({
        FirstName: joi.string().min(3).max(20).required().messages({
            "any-required": "FirstName cant be empty it required",
            "string.min": "FirstName require mimimum 3 charector",
            "string.max": "FirstName maximum 20 charector allow"
        }),
        LastName: joi.string().min(3).max(20).required().messages({
            "any-required": "LastName cant be empty it required",
            "string.min": "LastName require mimimum 3 charector",
            "string.max": "LastName maximum 20 charector allow"
        }),
        Mobile: joi.number().required().messages({
            "any.required": "Mobile Number shuld not be empty",
        }),
        Email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
            "string.email": "useremail shuld be a valid email",
            "any.required": "userEmail is required",
        }),
        Password: joi.string()
            .min(4)
            .max(10)
            .required()
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
            .messages({
                "any.required": "Password should not be empty",
                "string.min": "Password should be at least 4 characters long",
                "string.max": "Password should not exceed 10 characters",
                "string.pattern.base":
                    "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
            }),
        confirmPassword: joi.string()
            .min(4)
            .max(10)
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
            .messages({
                "string.min": "Password should be at least 4 characters long",
                "string.max": "Password should not exceed 10 characters",
                "string.pattern.base":
                    "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
            }),
    })
    console.log(userschema.validate(body))
    const { error } = userschema.validate(body)
    if (error) {
        res.json({ message: error.message })
    } else {
        next()
    }
}
module.exports = userValidation