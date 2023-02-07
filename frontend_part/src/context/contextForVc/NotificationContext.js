import React, { createContext, useState, useRef, useEffect,useContext } from 'react';
import AccountContext from '../accountContext';
import { SocketContext } from './VcContext';
const NotificationContext = createContext();

const ContextProviderN = ({ children }) => {

    const {socket,setMe} = useContext(AccountContext);
    // const {setCall,setMe}=useContext(SocketContext);
useEffect(() => {
  
   socket.current && socket.current.emit('getSocketId', (socketId) => {
        console.log(`Received socket ID: ${socketId}`);
        setMe(socketId);
      });
    //   socket.current &&   socket.current.on('callUser', ({ from, name: callerName, signal }) => {
    //     console.log({from},"call user in frontend")
    //     setCall({ isReceivingCall: true, from, name: callerName, signal });
    //   });
}, [])


    return (
        <NotificationContext.Provider
        >
          {children}
        </NotificationContext.Provider>
      );
    };
    
    export { ContextProviderN, NotificationContext };