const Jimp = require("jimp");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const file = await Jimp.read(tempUpload);
    file.resize(250, 250).quality(60).write(tempUpload);
    console.log("2");

    const resultUpload = path.join(avatarsDir, imageName);
    console.log("3");
    await fs.rename(tempUpload, resultUpload);
    console.log("4");
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
