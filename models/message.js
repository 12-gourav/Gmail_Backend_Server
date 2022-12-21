import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true,
    },
    senderImage:{
        type:String,
        require:true
    },
    reciver:{
        type:String,
        required:true
    },
    date:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
type:String,
require:true
    },
    image:{type: Array},
    audio:[
        {
        type:String
        }
    ],
    video:[
        {
        type:String
        }
    ],
    doc:[
        {
        type:String
        }
    ],

},{
    timestamps:true
});


export const Message = mongoose.model("message",messageSchema);