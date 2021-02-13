const  mongoose = require ('mongoose');
let schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectID 

let book  = new mongoose.Schema({
FullName : String ,
Email : String,
Phone_Number : Number,
City: String,
Date : String,
Alt_Date: String 
})

module.exports = mongoose.model('book',book)