import jwt from 'jsonwebtoken'
const JWT_SECRET = '12!@DHL';
const authenticate=(req,res,next)=>{
    //get user from the jwt token and add id to request
    const token=req.header('auth-token');
    if (!token) {
        res.status(401).send({error:"token not found"})
        
    }
    try {
        //verifying token which come from header
    const data =jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
        
    } catch (error) {
        res.status(401).send({error:"not a valid token"})

    }

}
export default authenticate;