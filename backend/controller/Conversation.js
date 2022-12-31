import conversation from "../models/conversation.js";


export const makeConversation=async(req,res)=>{
try {
    const senderId=req.body.senderId;
    const receiverId=req.body.receiverId;
    // finding in conversation collection that this conversation already exists or not
    const exist=await conversation.findOne({members: {$all:[senderId,receiverId]}})
    // dollar all will check that the all the elements of your array are matching or not
    if(exist){
        return res.status(200).json('conversation already exists')
    }
    // now make a new conversation
    const newConversation =new conversation({
        members:[senderId,receiverId]
    })

    await newConversation.save();
    return res.status(200).json('conversation saved')
} catch (error) {
    console.log("errror in  /backend/controller/conversation/makeconversation",error);
}
}
export const getConversation=async (req,res)=>{
    try {
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;
      let convo =await conversation.findOne({members: {$all:[senderId,receiverId]}})
    //   console.log("convo",convo)
      return res.status(200).json(convo);
    } catch (error) {
        console.log("errrot in controller in backend in get conversation",error)
    }  
}