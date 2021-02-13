const  mongoose = require ('mongoose');
let schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectID 

let photographer  = new mongoose.Schema({
  photographer_pic : String,
    photographer_Name : String ,
    username: String,
    Phone_Number: Number,
    Location : String,
    Photography_email : String ,
    Password: String,
   
})

module.exports = mongoose.model('photographer',photographer)


