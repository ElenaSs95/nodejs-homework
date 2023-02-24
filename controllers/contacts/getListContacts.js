const { Contact } = require("../../models");

const getListContacts = async (req, res) => {
  const contacts = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getListContacts;
