const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const crypto = require('crypto');
const sendActivationEmail = require('../../helpers/nodemailer');





// register
const registerUser = async(req, res) => {
    const {userName, email, password} = req.body;

    try{
        const checkUser = await User.findOne({ email});
        if(checkUser)
            return res.json({
        success: false,
        message: "user already exists",
        });

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




module.exports = {registerUser, loginUser, logoutUser, authMiddleware, verifyCode };



