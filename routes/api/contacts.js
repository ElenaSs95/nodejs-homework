const express = require("express");

const { controllersWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas/index");
const { contacts: controllers } = require("../../controllers");

const router = express.Router();

router.get("/", controllersWrapper(controllers.getListContacts));
router.get("/:contactId", controllersWrapper(controllers.getContactById));
router.post(
  "/",
  validation(contactSchema),
  controllersWrapper(controllers.addContact)
);
router.delete("/:contactId", controllersWrapper(controllers.removeContact));
router.put(
  "/:contactId",
  validation(contactSchema),
  controllersWrapper(controllers.updateContact)
);

module.exports = router;
