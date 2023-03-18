const express = require("express");

const {
  controllersWrapper,
  validation,
  auth,
  upload,
} = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerificationSchema,
} = require("../../models/user");
const { user: controllers } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  controllersWrapper(controllers.register)
);
router.post(
  "/login",
  validation(joiLoginSchema),
  controllersWrapper(controllers.login)
);
router.post("/logout", auth, controllersWrapper(controllers.logout));
router.get("/current", auth, controllersWrapper(controllers.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  controllersWrapper(controllers.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllersWrapper(controllers.updateAvatar)
);
router.get(
  "/verify/:verificationToken",
  controllersWrapper(controllers.emailVerification)
);
router.post(
  "/verify",
  validation(joiVerificationSchema),
  controllersWrapper(controllers.resendingVerification)
);

module.exports = router;
