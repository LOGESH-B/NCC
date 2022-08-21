
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({

    activity_name:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true
    },
    brief_discription:{
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
    },
    img:{
        type:[String],
    }
});
const Activity = new mongoose.model("Activity", activitySchema);
module.exports = Activity;