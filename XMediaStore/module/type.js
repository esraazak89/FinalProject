const  mongoose = require ('mongoose');
let schema = mongoose.Schema;

let type  = new mongoose.Schema({
typeName : String 
})

module.exports = mongoose.model('type',type)