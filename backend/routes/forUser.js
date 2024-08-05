import express from "express";
import { addNewUser,getUsers,getDetails,login, setData } from "../controller/userController.js";
import { makeConversation,getConversation } from "../controller/Conversation.js";
import { sendMessage,getMessages,deleteForEveryone, deleteForMe } from "../controller/messageFunctions.js";
import { uploadFile,getImage,uploadaudio, getAudio } from "../controller/imageController.js";
import upload from "../middleware/upload.js";
import uploadA from "../middleware/uploadA.js";
import authenticate from '../middleware/authenticate.js'
const router=express.Router();
//all these methods are written in routes folder and fuction are imported from controller folder
router.post('/addNewUser',addNewUser);
router.get('/fetchDetails',authenticate,getDetails);
router.post('/login',login);
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
router.get('/audiofile/:filename',getAudio);// grid fs stream for collecting files from mongodb which is present in mongodb

router.post('/file/uploadAudio',uploadA.single("audio"),uploadaudio)

// profile 
// edit name
router.put('/edit/name/:id',authenticate,setData);
// messsages
// deletion
router.put('/delete/forEveryone/:id',authenticate,deleteForEveryone);
router.put('/delete/forMe/:id',authenticate,deleteForMe);
export default router; 