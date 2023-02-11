const Monitor = require('../models/monitor')
const config = require('../config')

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const { validationResult } = require("express-validator")
// exports.get= async (req, res, next) => {
//     // res.render('index', { title: 'Express' });
//     const monitor = await Monitor.find().select('Name Photo Locaton').sort({ id: -1 });

//     const monitors = monitor.map((monitors,index) => {
//         return {
//             brand:monitor.brand,
//             // name : monitor.name
//         }
//     })

//     res.status(200).json({
//         test : ":D"
//     })
// }

exports.get = async (req, res, next) => {
    const monitor = await Monitor.find().sort({ _id: -1 });

    res.status(200).json({
        data: monitor
    }
    )
}

exports.update = async (req, res, next) => {
    
    try {
        const { id } = req.params
        const { brand, modelName, price, amount } = req.body
      
        const monitor = await Monitor.updateOne({ _id: id }, {
            brand: brand, modelName: modelName, price: price, amount: amount
        });

        if (monitor.matchedCount === 0) {
            const error = new Error('Company not found')
            error.statusCode = 404
            throw error
          } 
          res.status(200).json({ message: 'updated successfully' })
        } catch (err) {
          next(err)
        }
      }



exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const monitor = await Monitor.deleteOne({ _id: id });
        if (monitor.deleteCount === 0) {
            const error = new Error("ไม่พบข้อมูล");
            error.statusCode = 400
            throw error;
        } else {
            res.status(200).json({
                message: 'ลบข้อมูลเรียบร้อยแล้ว'
            })
        }
    } catch (e) {
        next(error);
    }
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
    const { brand, modelName, price, amount } = req.body
    let monitor = new Monitor({
        // photo: await saveImageToDisk(photo),
        brand: brand,
        modelName: modelName,
        price: price,
        amount: amount

    });
    await monitor.save()

    res.status(200).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',

    })
}

// async function saveImageToDisk(baseImage) {
//     //หา path จริงของโปรเจค
//     const projectPath = path.resolve('./');
//     //โฟลเดอร์และ path ของการอัปโหลด
//     const uploadPath = `${projectPath}/public/images/`;

//     //หานามสกุลไฟล์
//     const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));

//     //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
//     let filename = '';
//     if (ext === 'svg+xml') {
//         filename = `${uuidv4.v4()}.svg`;
//     } else {
//         filename = `${uuidv4.v4()}.${ext}`;
//     }

//     //Extract base64 data ออกมา
//     let image = decodeBase64Image(baseImage);

//     //เขียนไฟล์ไปไว้ที่ path
//     await writeFileAsync(uploadPath + filename, image.data, 'base64');
//     //return ชื่อไฟล์ใหม่ออกไป
//     return filename;
// }

// function decodeBase64Image(base64Str) {
//     var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//     var image = {};
//     if (!matches || matches.length !== 3) {
//         throw new Error('Invalid base64 string');
//     }

//     image.type = matches[1];
//     image.data = matches[2];

//     return image;
// }