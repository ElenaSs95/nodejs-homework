const fs = require("fs/promises");

const contactsPath = require("./filePath");

const readContactsFromFile = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

module.exports = readContactsFromFile;
