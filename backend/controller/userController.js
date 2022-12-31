import User from '../models/schemaForUser.js'

export  const addNewUser=async (req,res)=>{
    try {
    const find=await User.findOne({sub:req.body.sub})
    if (find) {
        console.log("user with this email id already exist");
        res.status(200).send("user already exists")
    }
    else{
        const newUser = new User(req.body)
        await newUser.save();
        console.log(newUser)
        res.status(200).json(newUser);

    }
    } catch (error) {
        console.log("error at usercontroller in controoller",error)
        res.status(500).json({
            "location":"userController.js",
            "error":error
        })
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