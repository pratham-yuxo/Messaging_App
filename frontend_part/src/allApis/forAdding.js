import axios from "axios"

const url='http://localhost:5000'
//for adding a user
export const createUser =async (data)=>{
    try {
      const response= await axios.post(`${url}/api/addNewUser`,data);
      const json=  response.data;

      if (json.success){ 
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        // history("/");
  console.log("stored ",json.authtoken);}
    }catch (error) {
     console.log("error in create user in src/allapi/for adding",error)   
    }
}
export const login=async(data)=>{
  try {
    const response= await axios.post(`${url}/api/login`,data);
    const json=  response.data;
    // console.log(response.data)
    if (json.success){ 
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken); 
      // history("/");
console.log("stored ",json.authtoken);}
  } catch (error) {
    console.log("error in login", error);
  }
}
// fetching details of user by jwt
export const fetchDetails = async () => {
  // API Call 
  try {
    const response = await axios.get(`${url}/api/fetchDetails`, {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.data;
    // console.log(json);
    return json;
    
  } catch (error) {
    console.log("error fetchdetails",error)
    
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
export const uploadAudio = async (data)=>{
    try {
  let response=await axios.post(`${url}/api/file/uploadAudio`,data,{
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })    
  return response;
    } catch (error) {
     console.log("error in frontend upload file",error)   
    }
}

//  for changing user profile

// for editing names in db
export const editName = async (newName,id)=>{
  try {
let response=await axios.put(`${url}/api/edit/name/${id}`,{name:newName},{      
  headers: {
  "auth-token": localStorage.getItem('token')
}});    
return response;
  } catch (error) {
   console.log("error in edit name",error)   
  }
}
// changing image
export const editImage = async (link,id)=>{
  try {
let response=await axios.put(`${url}/api/edit/name/${id}`,{imageUrl :link},{      
  headers: {
  "auth-token": localStorage.getItem('token')
}});    
return response;
  } catch (error) {
   console.log("error in edit name",error)   
  }
}
// changing bio
export const EditBio = async (newBio,id)=>{
  try {
let response=await axios.put(`${url}/api/edit/name/${id}`,{bio :newBio},{      
  headers: {
  "auth-token": localStorage.getItem('token')
}});    
return response;
  } catch (error) {
   console.log("error in edit name",error)   
  }
}
// messagess
export const DeleteForEveryone=async(msgId)=>{
  try {
    let response= await axios.put(`${url}/api/delete/forEveryone/${msgId}`,{},{      
      headers: {
      "auth-token": localStorage.getItem('token')
    }});
    return response;
    
  } catch (error) {
    console.log(error,"error in del for ev")
  }
}
export const DeleteForMe=async(msgId)=>{
  try {
    let response= await axios.put(`${url}/api/delete/forMe/${msgId}`,{},{      
      headers: {
      "auth-token": localStorage.getItem('token')
    }});
    return response;
    
  } catch (error) {
    console.log(error,"error in del for ev")
  }
}
