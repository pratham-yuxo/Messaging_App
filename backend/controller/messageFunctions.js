import message from "../models/message.js"
import conversation from "../models/conversation.js";


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