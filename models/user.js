import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    account:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        maxlength:[12,"Password no greater then 12 character"],
        minlength:[6,"Password not smaller then 6 character"]
    },
    type:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
        maxlength:[500,"No longer then this word limit"]
    },
    image:{
        type:String
    }
});


userSchema.pre("save",async function (next){
if(!this.isModified("password")){
    return next();
}
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(this.password,salt);
this.password = hashPassword;
next();
});
userSchema.methods.getJWTToken = function(){
    return JWT.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE*24*60*60*1000,
    })
    }
    userSchema.methods.comparePassword = async function(password){
       return await bcrypt.compare(password,this.password);
    }


export const User = mongoose.model("user",userSchema);