const mongoose = require("mongoose");

mongoose.model("credStudent", {
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    new:{
        type:String,
        require:false
    }
})