const mongoose = require('mongoose');
const Schema = mongoose.Schema

const staffSchema = new Schema({
    name:  {type: String, required:true,trim:true}, // String is shorthand for {type: String}
    salary: {type:Number},
    created: {type:Date,default:Date.now},
    photo: { type: String, default: "nopic.png" },
  },{collection:"staffs"});


  const staff = mongoose.model("staff",staffSchema)

  module.exports = staff