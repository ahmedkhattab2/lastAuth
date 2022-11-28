const mongoose=require('mongoose');
const auth2=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    type:Number
});
module.exports=mongoose.model('AUTH',auth2);