const fs = require("fs/promises");

const contactsPath = require("./filePath");

const writeDataInFile = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
};

module.exports = writeDataInFile;
