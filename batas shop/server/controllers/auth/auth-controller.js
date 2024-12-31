const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const crypto = require('crypto');
const {sendActivationEmail, sendResetEmail} = require('../../helpers/nodemailer');





// register
const registerUser = async(req, res) => {
    const {userName, email, password} = req.body;

    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[._])[A-Za-z\d._]{8,}$/;
      return regex.test(password);
    };

    try{
        const checkUser = await User.findOne({ email});
        if(checkUser)
            return res.json({
        success: false,
        message: "user already exists",
        });

        if (!validatePassword(password)) {
          return res.status(400).json({
              success: false,
              message: "Password must be at least 8 characters long and include letters, numbers, and one of the following: . _",
          });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email , 
            password : hashPassword,
        });

        const verificationCode = crypto.randomInt(100000, 999999).toString();

        // Set the verification code and its expiration time (e.g., 1 hour)
        newUser.verificationCode = verificationCode;
        newUser.verificationCodeExpires = Date.now() + 3600000; // 1 hour


        await newUser.save()

        await sendActivationEmail(email, verificationCode);

        res.status(200).json({
            success : true,
            message : "Registration successful ",
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "some error occured",
        });
    }
};


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const checkUser = await User.findOne({ email });
      if (!checkUser)
        return res.json({
          success: false,
          message: "User doesn't exists! Please register first",
        });


      if (!checkUser.isActive)
        return res.json({
          success: false,
          message: "Account is not activated! Please check your email to activate it.",
        });
  
      const checkPasswordMatch = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!checkPasswordMatch)
        return res.json({
          success: false,
          message: "Incorrect password! Please try again",
        });
  
      const token = jwt.sign(
        {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          userName: checkUser.userName,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "120m" }
      );
  
      res.cookie("token", token, { httpOnly: true, secure: true }).json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };
  

//logout


const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};


//auth middleware


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

/*
const activateAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isActive) return res.status(400).json({ message: 'Account already activated' });

    user.isActive = true; // Activate the account
    await user.save();

    res.status(200).json({ message: 'Account activated successfully!' });
  } catch (e) {
    res.status(400).json({ message: 'Invalid or expired token', error: e.message });
  }
};*/


const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist!",
      });

    if (checkUser.verificationCode !== code)
      return res.json({
        success: false,
        message: "Invalid verification code!",
      });

    if (checkUser.verificationCodeExpires < Date.now())
      return res.json({
        success: false,
        message: "Verification code has expired!",
      });

    // Activate the user's account
    checkUser.isActive = true;
    checkUser.verificationCode = null; // Clear the verification code
    checkUser.verificationCodeExpires = null; // Clear the expiration time
    await checkUser.save();

    res.status(200).json({
      success: true,
      message: "Account successfully activated!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};


const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  try {
      const checkUser = await User.findOne({ email });
      if (!checkUser)
          return res.json({
              success: false,
              message: "User doesn't exist!",
          });

      const resetToken = crypto.randomBytes(32).toString("hex");
      checkUser.resetToken = resetToken;
      checkUser.resetTokenExpires = Date.now() + 24 * 60 * 60 * 1000; 
      await checkUser.save();

      const resetLink = `${process.env.CLIENT_BASE_URL}/auth/reset-password/${resetToken}`;
      await sendResetEmail(email, resetLink);

      res.status(200).json({
          success: true,
          message: "Password reset email sent!",
      });
  } catch (e) {
      console.error("Error during password reset:", e);
      res.status(500).json({
          success: false,
          message:  e.message || "Some error occurredddd",
      });
  }
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }
  try {
      const checkUser = await User.findOne({ resetToken: token });

      if (!checkUser) {
          console.error("No user found for the given token.");
          return res.status(400).json({
              success: false,
              message: "Invalid or expired reset token!",
          });
      }

      if (checkUser.resetTokenExpires < Date.now()) {
          console.error("Token has expired.");
          return res.status(400).json({
              success: false,
              message: "Reset token has expired!",
          });
      }

      const hashPassword = await bcrypt.hash(newPassword, 12);
      checkUser.password = hashPassword;
      checkUser.resetToken = null; // Invalidate the token
      checkUser.resetTokenExpires = null; // Clear expiration
      await checkUser.save();

      res.status(200).json({
          success: true,
          message: "Password reset successfully!",
      });
  } catch (e) {
      console.error("Error resetting password:", e);
      res.status(500).json({
          success: false,
          message: "An error occurred while resetting the password.",
      });
  }
};





module.exports = {registerUser, loginUser, logoutUser, authMiddleware, verifyCode, requestPasswordReset, resetPassword};



