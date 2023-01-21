const User = require("../models/user");
const { validationResult } = require("express-validator")


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