require('dotenv').config();

module.exports={
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    Domain:process.env.Domain
}