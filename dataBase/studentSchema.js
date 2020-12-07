const mongoose = require("mongoose");

mongoose.model("dataStudent", {
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})