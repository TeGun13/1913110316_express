const Shop = require('../models/shop');

exports.Shop= async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const shops = await Shop.find().select('Name Photo Locaton').sort({ id: -1 });

    const shopWithPhotoDomin = shops.map((shop,index) => {
        return {
            id:shop._id,
            name:shop.name,
            photo:'http://localhost:300/images/' + shop.photo,
            location: shop.location
        }
    })

    res.status(200).json({
        data: shopWithPhotoDomin


    })
}

exports.menu = async (req , res) => {
    const shop = await Menu.find()
      .select('name price')
      .populate('shop', 'name')
      .sort({ _id: -1 });
    res.send({
      data: shop,
    });
}
