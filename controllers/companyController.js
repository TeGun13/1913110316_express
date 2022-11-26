exports.company=function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.status(200).json({
        data:[{
            id:1,
            name:'Techno Brave Asia ',
            address:{
                province:'Bangkok',
                postcode: 10400
            }
          },
          {
            id:2,
            name:'CCI International',
            address:{
                province:'Bangkok',
                postcode: 10210
            }
          },
          {
            id:3,
            
                name:'get in tech',
            address:{
                province:'Bangkok',
                postcode: 10210
          }
        }
        ]
        })
      }
