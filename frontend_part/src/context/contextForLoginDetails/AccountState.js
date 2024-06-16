import React, { useEffect, useState, useRef } from "react";
import AccountContext from "../accountContext";
//socket io stuff
import { io } from "socket.io-client";

const AccountState = (props) => {
  const [Details, setDetails] = useState(null);
  const [chatOfPersonOnWhichUHaveClicked, setchatOfPersonOnWhichUHaveClicked] =
    useState([]);
  const [loaderf, setloaderf] = useState(false);
  const [msgflag, setmsgflag] = useState(false); //for displaying new msgs
  // for handling of dialog box
  const [dialogbox, setDialogbox] = useState(false);
  // to store the list of active users
  const [activeUsers, setactiveUsers] = useState([]);
  const [darkMode, setdarkMode] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:5000"); //address of backend where server of socket is running
  }, []);

  return (
    <AccountContext.Provider
      value={{
        Details,
        setDetails,
        chatOfPersonOnWhichUHaveClicked,
        setchatOfPersonOnWhichUHaveClicked,
        socket,
        activeUsers,
        setactiveUsers,
        loaderf,
        setloaderf,
        msgflag,
        setmsgflag,
        setDialogbox,
        dialogbox,
        darkMode,
        setdarkMode,
        videoCall,
        setVideoCall,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
