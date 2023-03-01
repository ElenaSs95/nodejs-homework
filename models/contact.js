const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contacts", contactSchema);

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.bool(),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = { Contact, joiContactSchema, joiFavoriteSchema };
