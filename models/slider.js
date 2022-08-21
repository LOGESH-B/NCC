
const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true
    },
    cover_img:{
        type:String,
        required:true
    }

});
const Slider = new mongoose.model("Slider", slideSchema);
module.exports = Slider;