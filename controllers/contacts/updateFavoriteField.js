const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateFavoriteField = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "succcess",
    code: 200,
    data: { result },
  });
};

module.exports = updateFavoriteField;
