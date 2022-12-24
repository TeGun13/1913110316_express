const Shop = require('../models/shop');
const Menu = require('../models/menu')

exports.Shop = async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const shops = await Shop.find()
    .select('Name Photo Locaton')
    .sort({ id: -1 });
    const shopWithPhotoDomin = shops.map((shop) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: `http://localhost:3000/images/${shop.photo}`,
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