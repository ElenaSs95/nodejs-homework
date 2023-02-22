const { NotFound } = require("http-errors");

const contactsOperatons = require("../../models/contacts/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperatons.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "succcess",
    code: 200,
    data: { result },
  });
};
module.exports = updateContact;
