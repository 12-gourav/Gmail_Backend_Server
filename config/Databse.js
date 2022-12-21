import mongoose from "mongoose";


export const database = ()=>{
    mongoose.connect(process.env.DB).then(()=>{
        console.log("Database connect successfully");
    }).catch((error)=>{
        console.log(error);
    })
}