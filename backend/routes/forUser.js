import express from "express";
import { addNewUser,getUsers } from "../controller/userController.js";
import { makeConversation,getConversation } from "../controller/Conversation.js";
import { sendMessage,getMessages } from "../controller/messageFunctions.js";
import { uploadFile,getImage } from "../controller/imageController.js";
import upload from "../middleware/upload.js";
const router=express.Router();
//all these methods are written in routes folder and fuction are imported from controller folder
router.post('/addNewUser',addNewUser)

//for showing data
router.get('/getUsers',getUsers)

// post request for creating a conversation
router.post('/conversation/add',makeConversation)
router.post('/conversation/getMessages',getConversation)
router.post('/message/send',sendMessage);
router.get('/message/get/:id',getMessages);
router.post('/file/upload', upload.single("file"),uploadFile);// calling the middleware before api , through multer
//  we cant directly store our files to mogodb, we have to parse formdata because it is in binary form , multer will handle this
// for getting files
router.get('/file/:filename',getImage);// grid fs stream for collecting files from mongodb which is present in mongodb
export default router;