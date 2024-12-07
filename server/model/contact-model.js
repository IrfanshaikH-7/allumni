const{Schema,model}= require("mongoose");

const contactSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    message:{type:String, required:true},

});

//create a model or a collection

const Contact=model("Contact",contactSchema);

module.exports=Contact;