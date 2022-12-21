import { Media } from "../models/media.js";
import { Message } from "../models/message.js";
import { Saved } from "../models/saved.js";
import { Template } from "../models/templates.js";
import { User } from "../models/user.js";
import { sendToken } from "../utils/sendToken.js";



export const register = async(req,res)=>{
try {
    
    const {name,age,gender,dob,account,password,type,bio,image,city,country,phone,website,address} = req.body;

    const existUser = await User.findOne({account}).exec();
    if(existUser){
        return res.status(400).json({error:"User already exist"});
    }
    else{
        const user = await User.create({name,age,gender,dob,account,password,type,bio,image,city,country,phone,website,address});
        if(user){
            sendToken(res,user,"User Saved Successfully");
         
        }
    }
} catch (error) {
    console.log(error);
    res.status(400).json({error:error});
}
    
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({account:email}).exec();{
            if(!user){
                return res.status(400).json({message:"User does not exist"});
            }else{
                const isMatch = await user.comparePassword(password);
                console.log(isMatch);
                if(!isMatch){
                    return res.status(400).json({message:"Invalid Credintials"}); 
                }
                sendToken(res,user,"Login successfully");
             
            }


        }
        
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error});
    }
}


export const logout = async(req,res)=>{
    try {
        res.status(200).cookie("token",null,{
         expires:new Date(Date.now()),
        }).json({success:true,message:"Logout Successfully"});
 
         
     } catch (error) {
         console.log(error);
         res.status(500).json({success:false,message:error.message});
     }
}


export const getInfo = async (req,res)=>{
  const user = await req.user;
   

res.status(200).json({message:"ok",user:user});

}




///messages


export const send = async(req,res)=>{
    const {sender,senderImage,reciver,date,subject,message,image} = req.body;

    const msg = await Message.create({sender,senderImage,reciver,date,subject,message,image});
    const imgset = await Media.create({id:sender,id2:reciver,image:image});
    if(!msg){
        return res.status(400).json({error:"Something went Wrong"});
    }
    res.status(201).json({message:"Message Send SuccessFully"});
}

export const getMsg = async (req,res)=>{
    const id = req.user.account;

    const msg = await Message.find({sender:id}).sort({createdAt:-1}).exec();
    

    if(msg !=[]){
return res.status(200).json({message:"ok",list:msg});
    }
    res.status(200).json({message:"Message Does Not exists"})
}

export const getMsg2 = async (req,res)=>{
    const id = req.user.account;

    const msg = await Message.find({reciver:id}).sort({createdAt:-1}).exec();
    

    if(msg !=[]){
return res.status(200).json({message:"ok",list:msg});
    }
    res.status(200).json({message:"Message Does Not exists"})
}


export const deletemsg = async (req,res)=>{
    const id = req.body;

    const msg = await Message.findByIdAndDelete({_id:id}).exec();
  
 res.status(200).json({message:"Message Deleted SuccessFully",list:msg});
    
   
}
export const media = async (req,res)=>{
    const id = req.body.sender;
    console.log(id);
    const media = await Media.find({$or:[{id},{id2:id}]}).sort({createdAt:-1}).exec();
    res.status(200).json({message:"Media Fetch SuccessFully",list:media});

}



export const addFav = async (req,res)=>{
    const {userid,favid,name,image} = req.body;

    const data = await Fav.create({userid,favid,name,image});
    res.status(200).json({message:"User Added SuccessFully",list:data});

}
















export const createTemplate = async (req,res)=>{
    try {
const {title,message} = req.body;



const data = await Template.create({title,message});
if(data){
    res.status(201).json({message:"Templates saved successFully",data:data});
}
       
    } catch (error) {
        console.log(error); 
    }
}


///display
export const displayTemplate = async(req,res)=>{
    try {

const data = await Template.find({}).sort({createdAt:-1}).exec();
res.status(200).json({message:"ok",data:data});

        
    } catch (error) {
        console.log(error); 
    }
}


///delete

export const deleteTemplate = async(req,res)=>{
    try {
const {id} = req.body;
console.log(id);
const data = await Template.findByIdAndDelete({_id:id});
if(data){
    res.status(201).json({message:"Templates Delete successFully",data:data});
}

        
    } catch (error) {
        console.log(error); 
    }
}

export const searchFriend = async (req,res)=>{
try {
    const {name} = req.body;
    const user = await User.findOne({account:name}).exec();
    if(!user){
        res.status(200).json({message:"User Does Not Exist"});
    }
    res.status(200).json({message:"Your Result",user:user});
    
} catch (error) {
    res.status(400).json({error:error});
}
}

