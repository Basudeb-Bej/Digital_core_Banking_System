// back-end/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserDashboard,
    getProfile,
    upload,
    updateProfileImage,
    changePassword,
    contactSupport,
    verifyForgotPasswordIdentity,
    sendForgotPasswordRequest,
 } = require("../controllers/userController");


// GET dashboard data for a user
router.get("/dashboard/:senderId", getUserDashboard);

/* FORGOT PASSWORD — identity verification gate (public, no auth token yet) */
router.post("/forgot-password/verify", verifyForgotPasswordIdentity);
router.post("/forgot-password/send", sendForgotPasswordRequest);

/* GET PROFILE */
router.get("/:userId", getProfile);

/* UPDATE PROFILE IMAGE */
router.put("/profile-image/:userId", upload.single("image"), updateProfileImage);

router.put("/change-password/:userId", changePassword);
router.post("/contact", contactSupport);


module.exports = router;