import React, { createContext, useState, useRef, useEffect,useContext } from 'react';
import Peer from 'simple-peer';
import AccountContext from '../accountContext';
const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const {videoCall,setVideoCall, socket,chatOfPersonOnWhichUHaveClicked} = useContext(AccountContext);
  const [callAccepted, setCallAccepted] = useState(false);  // call accepted or not
  const [callEnded, setCallEnded] = useState(false);          // is call ended or not
  const [stream, setStream] = useState();
  const [name, setName] = useState('');                  //name of the person which we have called
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');          //for storing socket id
  const [idUser, setIdUser] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const getSocketId=(receiverId)=>{
    socket.current.emit('getSocketIdOfPersonYouAreCalling',receiverId);
    socket.current.on('receiverSocketId', (id) => {
      console.log("id from fronend",id);
      setIdUser(id);
  
    });
  
    }
  useEffect(() => {
  
      // console.log("setting my video")
      // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      // .then((currentStream) => {
      //   setStream(currentStream);
        
      //   // setting the video of ours on screen
      //   if(myVideo.current){
          
      //     myVideo.current.srcObject = currentStream;
      //   }
      // });
      
    
    if(socket.current){

      socket.current.emit('getSocketId', (socketId) => {
        console.log(`Received socket ID: ${socketId}`);
        setMe(socketId);
      });
      //   socket.on('startVc');
      socket.current.on('callUser', ({ from, name: callerName, signal }) => {
        console.log({from},"call user in frontend")
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
      getSocketId(chatOfPersonOnWhichUHaveClicked.email);
    }
    }, [videoCall,socket.current]);

//    answering a call using peer
useEffect(() => {
  


}, [])

const answerCall = () => {
//  !videoCall && setVideoCall(true);
  setCallAccepted(true);


  
   //  initiator false means we are not initiating this call, we are just picking it up
   const peer = new Peer({ initiator: false, trickle: false, stream });        // we are getting stream from use effect
   
   // creating a signal
   peer.on('signal', (data) => {
     console.log("peer",data);
     socket.current.emit('answerCall', { signal: data, to: call.from });
    });
    
    // setting the video of other person on screen
    peer.on('stream', (currentStream) => {
      console.log("just see this",currentStream);
      userVideo.current.srcObject = currentStream;
    });
    
    peer.signal(call.signal);
    
    connectionRef.current = peer;

  };
  // getting socket id of the person which you are calling

//   calling a user
// that id which is written just below which is passed as a arguement to callUser is the socket id of the person we are calling
  const callUser = () => {

    //  const id=getSocketId(chatOfPersonOnWhichUHaveClicked.email);
    //  console.log("see now",id)
    
    console.log("calling function call user",chatOfPersonOnWhichUHaveClicked.email)
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      console.log(peer);
      socket.current.emit('callUser', { userToCall: idUser, signalData: data, from: me, name });
    });
console.log("stream is next")
    peer.on('stream', (currentStream) => {
      console.log(userVideo.current)
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setStream
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };