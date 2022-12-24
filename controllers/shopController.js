const Shop = require('../models/shop');

exports.Shop= async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const shop = await Shop.find();

    res.status(200).json({
        data: shop


    })
}
