// back-end/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserDashboard,
    getProfile,
    upload,
    updateProfileImage,
    changePassword,
    contactSupport,
 } = require("../controllers/userController");


// GET dashboard data for a user
router.get("/dashboard/:senderId", getUserDashboard);

/* GET PROFILE */
router.get("/:userId", getProfile);

/* UPDATE PROFILE IMAGE */
router.put("/profile-image/:userId", upload.single("image"), updateProfileImage);

router.put("/change-password/:userId", changePassword);
router.post("/contact", contactSupport);


module.exports = router;
