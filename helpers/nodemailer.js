const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_USER, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465 и 2255
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
};

const nodemailerSender = nodemailer.createTransport(nodemailerConfig);

module.exports = nodemailerSender;
