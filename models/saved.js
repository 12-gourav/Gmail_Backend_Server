import mongoose from "mongoose";

const {ObjectId} = mongoose;

const savedSchema = new mongoose.Schema({
    id:{
        type:ObjectId,
        ref:"Message"
    }
},{timestamps:true});

export const Saved = mongoose.model("saved",savedSchema);