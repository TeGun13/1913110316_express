const Staff = require('../models/staff');

exports.staff = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const staff = await Staff.findOne()

    res.status(200).json({
        data: 'staff'


    })
}


exports.insert = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const { name, salary } = req.body
    let staff = new Staff({
        name: name,
        salary: salary
    });
    await staff.save()

    res.status(200).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',

    })
}


