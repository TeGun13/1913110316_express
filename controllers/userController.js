const User = require("../models/user");

exports.index =function(req, res, next) {
    // res.send('Hello baboi');
    res.status(200).json({
      Fullname:'Kunyanut Techaphalangrak'
    })
  
  }

  exports.bio =function(req, res, next) {
    // res.send('Hello baboi');
    res.status(200).json({
      Fullname:'Kunyanut Techaphalangrak',
      Nickname:"Gun",
      Hobby:"Drawning",
      GithubUsername:"TeGun13"
    })
  
}


exports.register = async(req,res,next)=>{
  const {name,email,password} = req.body

  let user = new User();
  user.name = name
  user.email = email
  user.password = await user.encryptPassword(password)

  await user.save()
  
res.status(200).json({
  
  message : "ลงทะเบียนเรียบร้อย"

})

}