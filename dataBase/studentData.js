const mongoose = require("mongoose");

mongoose.model("dataStudent", {
    user_name:{
        type:String,
        require:true
    },
    user_address:{
        type:String,
        require:true
    },
    user_rollNumber:{
        type:String,
        require:false
    },
    user_department:{
        type:String,
        require:true
    },
    user_semester:{
        type:String,
        require:true
    }
})