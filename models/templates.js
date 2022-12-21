import mongoose from "mongoose";

const templateSchema  = new mongoose.Schema({
   title:{
    type:"String",
    unique:true,
    require:true
   },
   message:{
    type:"String",
    unique:true,
    require:true
   }
},{timestamps:true});


export const Template = mongoose.model("template",templateSchema);