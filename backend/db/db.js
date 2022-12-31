import mongoose from 'mongoose';
import { config } from 'dotenv';
//hiding sensitive information in .env file , npm i .env
// destructuring config from dotenv 
config(); 
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_USERNAME_PRATHAM_PASSWORD;
const URI =`mongodb://${USERNAME}:${PASSWORD}@ac-0nmxoht-shard-00-00.z7xxwfr.mongodb.net:27017,ac-0nmxoht-shard-00-01.z7xxwfr.mongodb.net:27017,ac-0nmxoht-shard-00-02.z7xxwfr.mongodb.net:27017/?ssl=true&replicaSet=atlas-bhu965-shard-0&authSource=admin&retryWrites=true&w=majority`;
const connect=async ()=>{//with the help of callback ZLKdVfDmEbdD5di
try {
    
  await  mongoose.connect(URI,{useUnifiedTopology:true});
  console.log("connected to mongod")


} catch (error) {
 console.log("eror in backend/db/db.js",error)   
}
}
export default connect