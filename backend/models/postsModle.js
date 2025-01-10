const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    title: {
        type:String,
        required :[true,'Title is rqured!'],
        trim:true,},

        description:{
            type:String,
            required:[true,'discription is requred!'],
            trim:true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    }
, {timestamps:true}
    
)
module.exports = mongoose.model('Posts', postSchema);