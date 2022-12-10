const Company = require('../models/company');

exports.company = async(req, res, next)=>{
  // res.render('index', { title: 'Express' });
  const company = await Company.find().sort({ _id: -1 });

  res.status(200).json({
      data: company

    // data: [{
    //   id: 1,
    //   name: 'Techno Brave Asia ',
    //   address: {
    //     province: 'Bangkok',
    //     postcode: 10400
    //   }
    // },
    // {
    //   id: 2,
    //   name: 'CCI International',
    //   address: {
    //     province: 'Bangkok',
    //     postcode: 10210
    //   }
    // },
    // {
    //   id: 3,

    //   name: 'get in tech',
    //   address: {
    //     province: 'Bangkok',
    //     postcode: 10210
    //   }
    // }
    // ]
  })
}

exports.insert = async (req, res) => {
  try {
    const { name, address } = req.body
    const company = new Company({ name, address })
    await company.save()
    res.status(200).json({ message: 'เพิ่มข้อมูลเรียบร้อย' })
  } catch (error) {
    res.status(404).json({ message: 'error : ' + err.message })
  }
}

exports.destroy = async (req, res, next) => {
  try {
      const { id } = req.params;
      const company = await Company.deleteOne({ _id: id });
      if (company.deleteCount === 0) {
          throw new Error('ไม่พบข้อมูลผู้ใช้งาน')
      } else {
          res.status(200).json({
              message: 'ลบข้อมูลเรียบร้อยแล้ว'
          })
      }

  } catch (error) {
      res.status(400).json({
          message: 'เกิดข้อผิดพลาด:' + error.message

      })
  }
}



exports.show = async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  try {
      const { id } = req.params;
      const company = await Company.findOne({
          _id: id
      });

      if (!company) {
          throw new Error('ไม่พบผู้ใช้งาน')
      } else {
          res.status(200).json({
              data: company

          })
      }


  } catch (error) {
      res.status(400).json({
          message: 'เกิดข้อผิดพลาด:' + error.message

      })
  }
}


exports.update = async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  try {
      const {id} = req.params
      const { name, address } = req.body

      const company = await Company.findById(id)
      company.name = name
      company.address = address

      await company.save()
      
      res.status(200).json({
          message: 'แก้ไขข้อมูลเรียบร้อยแล้ว',

      })
  } catch (error) {
      res.status(400).json({
          message: 'เกิดข้อผิดพลาด:' + error.message

      })

  }
}


