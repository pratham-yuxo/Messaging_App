import User from '../models/schemaForUser.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const JWT_SECRET = '12!@DHL';
export  const addNewUser=async (req,res)=>{
    try {
        let success=false;
        // finding if the user with given email id exists
    const find=await User.findOne({email:req.body.email})
    if (find) {
        console.log("user found")
        // user already exists
        // it means if byGoogle is false ,then email is already registered
        if (req.body.byGoogle) {
            console.log("uf by google")
            console.log("user with this email id already exist");
            const data = {
                user: {
                    id: find._id
                }
            }
            
            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success, authtoken });
        }
        else{
            console.log("by google false")
            success=false;
            res.status(500).json({
                "message":"This e-mail id has already signed up"
            })
        }
        
    }
    else{ 
        console.log("not found")
        if (!req.body.byGoogle) {
            console.log("by google false")
            const salt = await bcrypt.genSalt(10);
            //it returns a promise
            const bcryptedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password=bcryptedPassword;
            
        }
        console.log("by google true")
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
    console.log(authtoken),newUser;
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
export const login=async(req,res)=>{
    let success=false;
  const { email2, password2 } = req.body;
    try {
        let user = await User.findOne({ email:email2 });
        if (!user) {
          return res.status(400).json({ error: "wrong credentials" })
        }
        const comparePassword = await bcrypt.compare(password2, user.password);
        if (!comparePassword) {
          return res.status(400).json({success, error: "wrong credentials" })
        }
        console.log(user.id, "backend login")
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.log("error in login", error);
    }
}
export const getDetails=async(req,res)=>{
    try {
        const Details=await User.findOne({_id:req.user.id})
        console.log('get details',Details)
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