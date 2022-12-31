import axios from "axios"


const url='http://localhost:5000'
//for adding a user
export const createUser =async (data)=>{
    try {
        await axios.post(`${url}/api/addNewUser`,data);
    } catch (error) {
     console.log("error in create user in src/allapi/for adding",error)   
    }
}
//for showing users
export const getUsers =async ()=>{
    try {
       let response= await axios.get(`${url}/api/getUsers`);
    //    console.log(response.data)
    return response.data;
    } catch (error) {
     console.log("error in create user in src/allapi/getUsers",error)   
    }
}
export const setConversation =async (data)=>{
    try {
       let response= await axios.post(`${url}/api/conversation/add`,data);
       return response.data;
    } catch (error) {
     console.log("error in create user in src/allapi/setConversation",error)   
    }
}
export const getConversation = async (data)=>{
    try {
  let response=await axios.post(`${url}/api/conversation/getMessages`,data)    
  return response.data;
    } catch (error) {
     console.log("error in frontend allapis for ading get conversaion",error)   
    }
}

// for sending message
export const sendMessage = async (data)=>{
    try {
  let response=await axios.post(`${url}/api/message/send`,data)    
  return response.data;
    } catch (error) {
     console.log("error in frontend allapis for ading send message",error)   
    }
}

export const getMessages = async (id)=>{
    try {
  let response=await axios.get(`${url}/api/message/get/${id}`)    
  return response.data;
    } catch (error) {
     console.log("error in frontend allapis for ading get message",error)   
    }
}
// for uploading file
export const uploadFile = async (data)=>{
    try {
  let response=await axios.post(`${url}/api/file/upload`,data)    
  return response;
    } catch (error) {
     console.log("error in frontend upload file",error)   
    }
}
