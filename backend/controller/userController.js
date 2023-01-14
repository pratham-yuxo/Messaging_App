import User from '../models/schemaForUser.js'
// const bcrypt = require('bcryptjs')
import jwt from 'jsonwebtoken'
const JWT_SECRET = '12!@DHL';
export  const addNewUser=async (req,res)=>{
    try {
        let success=false;
    const find=await User.findOne({email:req.body.email})
    if (find) {
        // case of login
        console.log("user with this email id already exist");
        const data = {
            user: {
              id: find._id
            }
          }
    
    const authtoken = jwt.sign(data, JWT_SECRET);
    success="notNew";
    res.json({success, authtoken });
        
    }
    else{ 
        // const salt = await bcrypt.genSalt(10);

        const newUser = new User(req.body)
        await newUser.save();
        console.log(newUser)
        // res.status(200).json(newUser);
        const data = {
            user: {
              id: newUser.id
            }
          }
    
    const authtoken = jwt.sign(data, JWT_SECRET)
    console.log(authtoken);
    success=true;
    res.json({success, authtoken });
        }
    } catch (error) {
        console.log("error at usercontroller in controoller",error)
        res.status(500).json({
            "location":"userController.js",
            "error":error
        })
    }
}
export const getDetails=async(req,res)=>{
    try {
        const Details=await User.findOne({user:req.user.id})
        res.json(Details);
        
    } catch (error) {
        console.log("backend get details",error);
        
    }
}
export const getUsers=async (req,res)=>{
try {
  const users=await User.find({})
    res.status(200).json(users);
    
} catch (error) {
    console.log("error in controller get users",error)
}
}