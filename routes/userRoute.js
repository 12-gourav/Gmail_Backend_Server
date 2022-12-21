import express from "express";
import { remove, upload } from "../controller/cloudinary.js";
import { createTemplate, deleteTemplate,getMsg2, displayTemplate, getInfo, getMsg, login, logout, register, send, searchFriend, deletemsg, media } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/getInfo",isAuthenticated,getInfo);
router.post("/send",isAuthenticated,send);
router.post("/getMessage",isAuthenticated,getMsg);
router.post("/getMessage2",isAuthenticated,getMsg2);
router.post("/uploadImages",isAuthenticated,upload);
router.post("/removeImages",isAuthenticated,remove);
router.delete("/removemsg",isAuthenticated,deletemsg);
////templates
router.post("/template-create",isAuthenticated,createTemplate);
router.post("/template-display",isAuthenticated,displayTemplate);
router.post("/template-delete",isAuthenticated,deleteTemplate);
///contacts
router.post("/search",isAuthenticated,searchFriend);
router.post("/media",isAuthenticated,media);
export default router;
