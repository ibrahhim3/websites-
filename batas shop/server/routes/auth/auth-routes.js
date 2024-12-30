const express = require("express");
const { registerUser, loginUser, logoutUser, authMiddleware, verifyCode, requestPasswordReset, resetPassword } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/verify', verifyCode);
router.post("/request-reset", requestPasswordReset);  // Added route for password reset request
router.post("/reset-password/:token", resetPassword);  // Added route for resetting
router.get('/check-auth', authMiddleware, (req,res)=> {
    const user = req.user;
    res.status(200).json({
        success : true,
        message : 'Authenticated user!!!',
        user,
    });
     

})

module.exports = router;
