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
    file:(req,file)=>{
        const match=["image/png","image/jpg","image/jpeg","image/webp"];
        //if index is not matched
        if (match.indexOf(file.mimeType)===-1) {
            return `${Date.now()}-file-${file.originalname}`;
        }
        //otherwise
        return {
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
        }
    }

})
export default multer({storage});//pass by multer as an object