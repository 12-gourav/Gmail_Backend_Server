import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name:"cooldeveloper",
    api_key: "827324634855899",
    api_secret:"FUVxiocCKHY30Gm-Xk1kYFHYv7E"
});


export const upload = async (req,res)=>{
try {

    let result = await cloudinary.v2.uploader.upload(req.body.image,{
        public_id:`${Date.now()}`,
        resource_type:"auto",
        folder:"Gmail"
    });
    console.log("result",result);
    res.json({
        public_id:result.public_id,
        url:result.secure_url
    });

    
} catch (error) {
    console.log(error);
}
}

export const remove = (req,res)=>{
    try {
         let image_id = req.body.public_id;
         cloudinary.v2.uploader.destroy(image_id,(err,result)=>{
            if(err) return res.json({success:false,err});
            res.send("ok");
         });



    } catch (error) {
        console.log(error);
    }

}