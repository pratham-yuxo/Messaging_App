import express from 'express';
import connect from './db/db.js';
//new es6 method set type module in package.json
import cors from 'cors';
import router from './routes/forUser.js';


const app = express();

connect();// connecting monogdb
const port = 5000;
app.use(cors());// cors ke error se bachne ke liye
app.use(express.json());
//there can be  a body parser error,parse the url
// if there is a url with space , then browser will fill it ,andyour api will not get called
app.use('/api',router);
//  routes
//                   /
//           /api
//     /addNewUser
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })