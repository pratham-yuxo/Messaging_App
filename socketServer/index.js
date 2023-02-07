import { Server } from 'socket.io';
// set type module
const port = 8000;
const io = new Server(port, {
    cors: {
        origin: 'http://localhost:3000'// allowing our frontend to connect ,to get rid of cors error
        // methods
    }
})

let users = [];//array of active user

// will add the active user to array
const addUser = (userData, socketId) => {
    // if user.email is not equal to userdata.email then it will add it to the array
    !users.some(user => user.email === userData.email) && users.push({ ...userData, socketId });
    // ... spreading it and then adding
}

// we have the user id ,now getting the socket id
const getUser = (userId) => {
    return users.find(user => user.email === userId);
}


const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}


io.on('connection', (socket) => {
    console.log("user connected",socket.id)

    // making routes
    socket.on('addUsers', data => {
        // now this will be called from chat list 
        addUser(data, socket.id);
        // and data will get Details which implies user is online

        // ṇow we have to send this information to frontend that who is online
        io.emit('getUsers', users);
    })

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId)
        user && io.to(user.socketId).emit('getMessage', data);
  

    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })

    // for video call
    // socket.on('startVc',()=>{
    //     console.log("started vc")
        io.emit('me',socket.id);

    // })
    // getting socket id of ourselves
    socket.on('getSocketId', (cb) => {
        cb(socket.id);
      });
      socket.on('getSocketIdOfPersonYouAreCalling',(receiverId)=>{
        const id=getUser(receiverId);
        // console.log("socket id from backend",id.socketId);
       id && socket.emit('receiverSocketId', id.socketId);

      })
    socket.on("disconnectFromVc", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log(userToCall,"here")
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
})