const  mongoose = require ('mongoose');
let schema = mongoose.Schema;


let customer  = new mongoose.Schema({
    
    customer_Name : String ,
    username: String,
    Phone_Number: Number,
    Location : String,
    customer_email : String ,
    Password: String,
   
})

module.exports = mongoose.model('customer',customer)


