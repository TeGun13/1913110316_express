const Menu = require('../models/shop');

exports.Menu= async (req, res, next) => {
    // res.render('index', { title: 'Express' });
    const menu = await Menu.find().select('Name Photo Locaton').sort({ id: -1 });

    const menus = menu.map((menus,index) => {
        return {
            name:menus.name,
            price:menus.price,
            location: menus.location
        }
    })

    res.status(200).json({
        data: menus


    })
}
