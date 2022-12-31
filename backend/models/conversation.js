import mongoose from "mongoose";

const newSchema =new mongoose.Schema({
    members:{
        type: Array,
    },
    message:{
        type: String// to display new recent mesasages
    }
},
{timestamps: true}
)
const conversation=mongoose.model('Conversation',newSchema);
export default conversation;