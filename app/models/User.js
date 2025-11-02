const mongoose  = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('user', UserSchema);
// schema a rule that defines a model
// model represents schema on a db
// convert schema to model usng model()
