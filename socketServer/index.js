import { Server } from 'socket.io';
// set type module
const port = 8000;
const io=new Server(port,{
    cors:{
        origin:'http://localhost:3000'// allowing our frontend to connect ,to get rid of cors error
    }
})

let users=[];//array of active user

// will add the active user to array
const addUser=(userData,socketId)=>{
    // if user.sub is not equal to userdata.sub then it will add it to the array
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
// ... spreading it and then adding
}

// we have the user id ,now getting the socket id
const getUser=(userId)=>{
    return users.find(user=>user.sub===userId);
}


const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}


    io.on('connection',(socket)=>{
    console.log("user connected")

    // making routes
    socket.on('addUsers',data=>{
        // now this will be called from chat list 
        addUser(data,socket.id);
        // and data will get Details which implies user is online

        // ṇow we have to send this information to frontend that who is online
        io.emit('getUsers',users);
    })
    socket.on('sendMessage',data=>{
        const user=getUser(data.receiverId)
       user&& io.to(user.socketId).emit('getMessage',data);


    })

 
        //disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
            removeUser(socket.id);
            io.emit('getUsers', users);
        })
})