const mongoose = require("mongoose");
const constant= require("../constant/constant")

module.exports = () => {
    mongoose.connect(constant.mongoUrl, { useNewUrlParser: true,  useUnifiedTopology: true },
    (error)=>{
        if(error){
            console.log(`error to conect data base`, error)
        }else{
            console.log(`data base conect`)
        }

    });
};