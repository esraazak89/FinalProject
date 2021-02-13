const  mongoose = require ('mongoose');
let schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectID 

let post  = new mongoose.Schema({
post_desc : String ,
post_pic : String,
price : Number,
Photography_Type:{type: objectId, ref: 'type'},
})

module.exports = mongoose.model('post',post)