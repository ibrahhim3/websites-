const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const sendEmail = require('../../helpers/mailer');





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
        
        const activationToken = jwt.sign(
          { email },
          "ACTIVATION_SECRET_KEY", // Use a secure environment variable in production
          { expiresIn: "1h" } // Token expires in 1 hour
        );



        const newUser = new User({
            userName, 
            email , 
            password : hashPassword,
        });

        await newUser.save()

        const activationLink = `http://localhost:5000/api/auth/activate/${activationToken}`;
        await sendEmail(
          email,
          "Activate Your Account",
          `<h2>Welcome ${userName}!</h2>
          <p>Please click <a href="${activationLink}">here</a> to activate your account.</p>`
        );


        res.status(200).json({
            success : true,
            message : "Registration successful, check your email for activation",
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
          return res.status(403).json({
            success: false,
            message: "Account not activated! Please check your email to activate your account.",
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
  
      res.cookie("token", token, { httpOnly: true, secure: false }).json({
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




// Activate User Account
const activateAccount = async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "ACTIVATION_SECRET_KEY");
    const { email } = decoded;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });

    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Account is already activated!",
      });
    }

    // Activate the account
    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account activated successfully! You can now log in.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Invalid or expired activation link.",
    });
  }
};



module.exports = {registerUser, loginUser, logoutUser, authMiddleware, activateAccount };



