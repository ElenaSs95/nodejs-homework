const express = require("express");

const { controllersWrapper, validation } = require("../../middlewares");
const { joiContactSchema, joiFavoriteSchema } = require("../../models/contact");
const { contacts: controllers } = require("../../controllers");

const router = express.Router();

router.get("/", controllersWrapper(controllers.getListContacts));
router.get("/:contactId", controllersWrapper(controllers.getContactById));
router.post(
  "/",
  validation(joiContactSchema),
  controllersWrapper(controllers.addContact)
);
router.delete("/:contactId", controllersWrapper(controllers.removeContact));
router.put(
  "/:contactId",
  validation(joiContactSchema),
  controllersWrapper(controllers.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema),
  controllersWrapper(controllers.updateFavoriteField)
);

module.exports = router;
