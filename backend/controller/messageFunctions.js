import message from "../models/message.js"
import conversation from "../models/conversation.js";
import User from "../models/schemaForUser.js";

export const sendMessage=async(req,res)=>{
try {
   const newMessage=new message(req.body);
//    saving the new message with sender ,receiver ,and conversation Id into database
    await newMessage.save();
    // for displaying latest messages 
    await conversation.findByIdAndUpdate(req.body.conversationId,{message: req.body.text});

    return res.status(200).json('message sent');
} catch (error) {
    console.log("error in controller message",error);
}
}

export const getMessages=async(req,res)=>{
try {
   const response= await message.find({conversationId:req.params.id});//finding through params not query

    return res.status(200).json(response);
} catch (error) {
    console.log("error in controller get message",error);
}
}
export const deleteForEveryone=async(req,res)=>{

try {
   let msg= await message.findOne({_id:req.params.id});//finding through params not query
   let user= await User.findOne({_id:req.user.id})
   if (msg.senderId!=user.email) {
    return res.json({success:false,error:"invalid user"});
    
   }
   else{
    const newData = {};
    newData.text="";
    newData.type="deleted";

     msg = await message.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
    res.json({success:true});       

   }

   
} catch (error) {
    console.log("error in controller get message",error);
}
}
export const deleteForMe=async(req,res)=>{

try {
    let helper=null;
   let msg= await message.findOne({_id:req.params.id});//finding through params not query
   let user= await User.findOne({_id:req.user.id});
//    the deleter is sender
const newData = {};
if (msg.senderId==user.email) {
       newData.senderDeleted=true;
   }
   else{
    newData.receiverDeleted=true;    
}

 msg = await message.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
res.json({success:true});       


} catch (error) {
    
    res.json({success:false});       
    console.log("error in controller get message",error);
}
}
