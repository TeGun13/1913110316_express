const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const { validationResult } = require("express-validator")

const Shop = require('../models/shop');
const Menu = require('../models/menu')
const config = require('../config')

exports.Shop = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const shops = await Shop.find()
        .select('name photo locaton')
        .sort({ id: -1 });
    const shopWithPhotoDomin = shops.map((shop) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: `${config.Domain}${shop.photo}`,
            location: shop.location
        }
    })

    res.status(200).json({
        data: shopWithPhotoDomin


    })
}

// exports.menu = async (req , res) => {
//     const menu = await Menu.find()
//       .select('name price')
//       //  .select('+name -price')
//       .populate('shop', 'name')
//       .sort({ _id: -1 });
//     res.send({
//       data: menu,
//     });
// }

exports.menu = async (req, res) => {
    const menu = await Menu.find()
        .populate('shop')
    // // .where('price').gt(100)
    //     //.select('name Price')
    //     .select('+name -price ')
    //     .populate('shop', 'name')
    //     .sort({ _id: -1 });
    res.send({
        data: menu,
    });
}


exports.show = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate('menus')
        if (!shop) throw new Error('shop not found')
        res.send({ data: shop })
    } catch (err) {
        res.status(404).json({ message: 'error : ' + err.message })
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


    const { name, location, photo } = req.body
    let shop = new Shop({
        name: name,
        location: location,
        photo: await saveImageToDisk(photo)
    });
    await shop.save()

    res.status(200).json({
        message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',

    })
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