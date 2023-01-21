const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const { validationResult } = require("express-validator")

const Staff = require('../models/staff');
const config = require('../config/index')


exports.staff = async (req, res, next) => {
    //  const staff = await Staff.find().sort({ _id: -1 });

    const staff = await Staff.find()
        .select("name photo location")
        .sort({ _id: -1 });

    const staffWithPhotoDomain = staff.map((staff, index) => {
        return {
            id: staff._id,
            name: staff.name,
            salary: staff.salary,
            photo: `${config.Domain}images/${staff.photo}`
        };
    });
    res.status(200).json({
        // data: staff
        data: staffWithPhotoDomain

    })
}


exports.insert = async (req, res, next) => {
    // res.render('index', { title: 'Express' });


    //validation  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422
      error.validationResult = errors.array()
      throw error;
    }


    const { name, salary, photo } = req.body
    let staff = new Staff({
        name: name,
        salary: salary,
        photo: photo && await saveImageToDisk(photo)

    });
    await staff.save()

    res.status(200).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',

    })
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const staff = await Staff.deleteOne({ _id: id });
        // if (staff.deleteCount === 0) {
        //     throw new Error('ไม่พบข้อมูลผู้ใช้งาน')
        // } else {
        //     res.status(200).json({
        //         message: 'ลบข้อมูลเรียบร้อยแล้ว'
        //     })
        // }

        // new error
        if (staff.deleteCount === 0) {
            const error = new Error("ไม่พบข้อมูลผู้ใช้งาน");
            error.statusCode = 404
            throw error;
        }
        res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อยแล้ว'
        })


    } catch (e) {
        // res.status(400).json({
        //     message: 'เกิดข้อผิดพลาด:' + error.message
        // })
 
        //new error
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 400
        next(error)

    }
}

exports.show = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    try {
        const { id } = req.params;
        const staff = await Staff.findOne({
            _id: id
        });
        // if (!staff) {
        //     throw new Error('ไม่พบผู้ใช้งาน')
        // } else {
        //     res.status(200).json({
        //         data: staff
        //     })
        // }

        //new error
        if (!staff) {
            const error = new Error("ไม่พบผู้ใช้งาน");
            error.statusCode = 404
            throw error;
        }

        res.status(200).json({
            data: staff
        })


    } catch (e) {
        // res.status(400).json({
        //     message: 'เกิดข้อผิดพลาด:' + error.message
        // })

        //new error
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 400
        next(error)

    }
}


exports.update = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    try {
        const { id } = req.params
        const { name, salary } = req.body

        // const staff = await Staff.findById(id)
        // staff.name = name
        // staff.salary = salary
        const staff = await Staff.updateOne({ _id: id },{
            name: name,
            salary: salary,
            });

        //new error
        if (!staff.modifiedCount) {
              const error =  new Error("No Staff was modified")
              error.statusCode = 405
              next(error);
          }
        await staff.save()

        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อยแล้ว',

        })
    } catch (e) {
        // res.status(400).json({
        //     message: 'เกิดข้อผิดพลาด:' + error.message

        // })

        //new error
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);

    }
}

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./');
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath + filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}