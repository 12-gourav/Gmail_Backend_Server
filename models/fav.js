import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true,
    },
    favid:{
        type:String,
        require:true,
        unique:true,
    },
    name:{
        type:string
    },
    image:{
        type:String
    }


},{timestamps:true});


export const Fav = mongoose.model("fav",favSchema);