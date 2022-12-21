import express from "express";
import { config } from "dotenv";
import { database } from "./config/Databse.js";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const PORT = 5000 || process.env.PORT;


config({path:"./config/.env"});

app.use(bodyParser.json({limit:"200mb"}));
app.use(cors());//using localhost://5173
database();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",userRoutes);


///routes
app.get("/",(req,res)=>{
    res.status(200).json({message:"server is running perfectly..... ",port:process.env.PORT});
})







app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})