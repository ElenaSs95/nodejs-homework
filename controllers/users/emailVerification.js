const { NotFound } = require("http-errors");

const { User } = require("../../models");

const emailVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({
    message: "Verification success",
  });
};

module.exports = emailVerification;
