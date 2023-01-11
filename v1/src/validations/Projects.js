const Joi = require("joi");

const createValidation=Joi.object({
    name: Joi.string().required().min(5),
    kira:Joi.string().required().min(5),
    isitma:Joi.string().required().min(5),
    odaSayisi:Joi.string().required().min(1),
    esyaDurumu:Joi.string().required().min(2),
    balkonDurumu:Joi.string().required().min(2),
    aciklama:Joi.string().required().min(5),
});

const updateValidation=Joi.object({
    name: Joi.string().required().min(5),
});

module.exports={
    createValidation,
    updateValidation
}