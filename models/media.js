import mongoose from "mongoose";



const mediaSchema = new mongoose.Schema({
    id:{
        type:String
    },
    id2:{
        type:String
    },
    image:{
        type:Array
    }
},{timestamps:true});

export const Media = mongoose.model("media",mediaSchema);