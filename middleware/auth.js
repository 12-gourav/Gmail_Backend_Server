import JWT from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async(req,res,next)=>{
    try {
    //    console.log(req.headers.authtoken);
        const token =  req.headers.authtoken;
        // console.log(token);

        if(!token){
            return res.status(400).json({error:"Login First"});

        }
const decoded = JWT.verify(token,process.env.JWT_SECRET);
 req.user = await User.findById(decoded._id);


next();

    } catch (error) {
        res.status(401).json({success:false,message:error.message});
        console.log(error);
    }
}