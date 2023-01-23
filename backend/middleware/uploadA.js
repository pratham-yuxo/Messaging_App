import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage"
import { config } from 'dotenv';
//hiding sensitive information in .env file , npm i .env
// destructuring config from dotenv 
config(); 
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_USERNAME_PRATHAM_PASSWORD;
const storage=new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@ac-0nmxoht-shard-00-00.z7xxwfr.mongodb.net:27017,ac-0nmxoht-shard-00-01.z7xxwfr.mongodb.net:27017,ac-0nmxoht-shard-00-02.z7xxwfr.mongodb.net:27017/?ssl=true&replicaSet=atlas-bhu965-shard-0&authSource=admin&retryWrites=true&w=majority`,
    //mogodb url
    options:{useUnifiedTopology:true,useNewUrlParser:true},
    file: (req, file) => {
      return {
        bucketName: 'audio',
        filename: `${Date.now()}-audio-${file.originalname}`
      };
    }           
})

export default multer({storage});//pass by multer as an object