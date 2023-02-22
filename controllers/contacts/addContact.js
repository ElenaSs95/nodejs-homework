const contactsOperatons = require("../../models/contacts/contacts");

const addContact = async (req, res, next) => {
  const result = await contactsOperatons.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
