const { NotFound } = require("http-errors");

const contactsOperatons = require("../../models/contacts/contacts");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperatons.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "succcess",
    code: 200,
    data: { result },
  });
};

module.exports = removeContact;
