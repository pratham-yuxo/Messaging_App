// import { Server } from "socket.io";
// import express from "express";
// import connect from "./db/db.js";
// //new es6 method set type module in package.json
// import cors from "cors";
// import router from "./routes/forUser.js";

// const app = express();

// connect(); // connecting monogdb
// const port = 5000;
// app.use(cors()); // cors ke error se bachne ke liye
// app.use(express.json());
// //there can be  a body parser error,parse the url
// // if there is a url with space , then browser will fill it ,andyour api will not get called
// app.use("/api", router);
// //  routes
// //                   /
// //           /api
// //     /addNewUser
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// // set type module
// // const port = 8000;
// const io = new Server(port, {
//   cors: {
//     origin: "http://localhost:3000", // allowing our frontend to connect ,to get rid of cors error
//     // methods
//   },
// });

// let users = []; //array of active user

// // will add the active user to array
// const addUser = (userData, socketId) => {
//   // if user.email is not equal to userdata.email then it will add it to the array
//   !users.some((user) => user.email === userData.email) &&
//     users.push({ ...userData, socketId });
//   // ... spreading it and then adding
// };

// // we have the user id ,now getting the socket id
// const getUser = (userId) => {
//   return users.find((user) => user.email === userId);
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);

//   // making routes
//   socket.on("addUsers", (data) => {
//     // now this will be called from chat list
//     addUser(data, socket.id);
//     // and data will get Details which implies user is online

//     // ṇow we have to send this information to frontend that who is online
//     io.emit("getUsers", users);
//   });

//   socket.on("sendMessage", (data) => {
//     const user = getUser(data.receiverId);
//     user && io.to(user.socketId).emit("getMessage", data);
//   });

//   //disconnect
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });

//   // for video call
//   // socket.on('startVc',()=>{
//   //     console.log("started vc")
//   io.emit("me", socket.id);

//   // })
//   // getting socket id of ourselves
//   socket.on("getSocketId", (cb) => {
//     cb(socket.id);
//   });
//   socket.on("getSocketIdOfPersonYouAreCalling", (receiverId) => {
//     const id = getUser(receiverId);
//     // console.log("socket id from backend",id.socketId);
//     id && socket.emit("receiverSocketId", id.socketId);
//   });
//   socket.on("disconnectFromVc", () => {
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     console.log(userToCall, "here");
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal);
//   });
// });

// ******** new code *******
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import connect from "./db/db.js";
import cors from "cors";
import router from "./routes/forUser.js";

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express app
// const io = new SocketIOServer(server); // Attach Socket.IO to the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000"], // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these methods
    credentials: true, // Allow credentials
  },
});
connect(); // connecting MongoDB
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let users = []; // array of active users

const addUser = (userData, socketId) => {
  !users.some((user) => user.email === userData.email) &&
    users.push({ ...userData, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.email === userId);
};


const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("addUsers", (data) => {
    addUser(data, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    user && io.to(user.socketId).emit("getMessage", data);
  });
 
   // Listen for an event to get an email by socket ID
  socket.on('getEmail', (socketId, callback) => {
    const user = users.find((user) => user.socketId === socketId);
    console.log("get mail",user)
    if (user) {
      callback(user.email);
    } else {
      callback(null);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("getSocketId", (cb) => {
    cb(socket.id);
  });

  socket.on("getSocketIdOfPersonYouAreCalling", (receiverId) => {
    const id = getUser(receiverId);
    id && socket.emit("receiverSocketId", id.socketId);
  });

  socket.on("disconnectFromVc", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(userToCall,"call",name)
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
