const mongoose=require('mongoose')

const project0Schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },

})

const Project=mongoose.model("User", project0Schema)
module.exports=Project;