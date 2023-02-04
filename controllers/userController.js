const User = require("../models/user");
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");
const config = require("../config");


exports.index = function (req, res, next) {
  // res.send('Hello baboi');
  res.status(200).json({
    Fullname: 'Kunyanut Techaphalangrak'
  })

}

exports.bio = function (req, res, next) {
  // res.send('Hello baboi');
  res.status(200).json({
    Fullname: 'Kunyanut Techaphalangrak',
    Nickname: "Gun",
    Hobby: "Drawning",
    GithubUsername: "TeGun13"
  })

}


exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    //validation  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422
      error.validationResult = errors.array()
      throw error;
    }

    const exitEmail = await User.findOne({ email: email })
    if (exitEmail) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานในระบบแล้ว");
      error.statusCode = 400
      throw error;
    }

    let user = new User();
    user.name = name
    user.email = email
    user.password = await user.encryptPassword(password)

    await user.save()


    res.status(200).json({
      message: "ลงทะเบียนเรียบร้อย"
    })
  }
  catch (error) {
    next(error)
  }

}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    // check email isExist
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    // token
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.roles,
      },
      "7BD3863E1132DAE50F7011F638DD2B0D62A674BB72296D77A441D1F3BCDC3F93",
      {
        expiresIn: "5 days",
      }
    );

    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};


exports.profile = function (req, res, next) {
  // res.send('Hello baboi');
  res.status(200).json({
    user:req.user
  })

}