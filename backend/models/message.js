import mongoose from "mongoose";

const newSchema =new mongoose.Schema({
    conversationId:{
        type: String
    },
    senderId:{
        type: String
    },
    receiverId:{
        type: String
    },
    text:{
        type:String
    },
    type:{
        type:String

    },
    senderDeleted:{
        type:Boolean,
        default:false
    },
    receiverDeleted:{
        type:Boolean,
        default:false
    },


},
{ timestamps:true}
)
const message=mongoose.model('Message',newSchema);
export default message;