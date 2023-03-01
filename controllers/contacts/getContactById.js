const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await Contact.findById(contactId);
  console.log(contact);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};

module.exports = getContactById;
