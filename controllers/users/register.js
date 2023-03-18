const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { nodemailerSender } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} is already registered`);
  }
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPass,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: "dosot76292@letpays.com",
    from: "esshevchenko95@gmail.com",
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please confirm your email</a>`,
  };

  await nodemailerSender.sendMail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: result.name,
        email: result.email,
        subscription: result.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
