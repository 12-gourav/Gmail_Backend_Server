

export const sendToken = async(res,user,message)=>{

    const token = await user.getJWTToken();

    res.status(200).cookie("token",token,{
        httpOnly:true,
        expires: new Date(Date.now()+process.env.JWT_EXPIRE*24*60*60*1000)
    }).json({message:message,user:user,token:token})

}