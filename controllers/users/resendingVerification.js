const { NotFound, BadRequest } = require("http-errors");

const { User } = require("../../models");
const { nodemailerSender } = require("../../helpers");

const resendingVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound(`User with email ${email} was not found`);
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: "dosot76292@letpays.com",
    from: "esshevchenko95@gmail.com",
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please confirm your email</a>`,
  };
  await nodemailerSender.sendMail(mail);
  res.json({
    message: "Verification email was sent",
  });
};

module.exports = resendingVerification;
