import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    caption : {
        type : String
    },
    likes : {
        type : Number
    },
    comments : [{
        body : String
    }]
},{
    timestamps : true
})

export default postSchema;