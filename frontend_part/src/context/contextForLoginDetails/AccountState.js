import React, {useEffect, useState,useRef } from 'react'
import AccountContext from "../accountContext"
//socket io stuff
import {io} from 'socket.io-client'


const AccountState = (props) => {
    const [Details, setDetails] = useState(null)
    const [chatOfPersonOnWhichUHaveClicked, setchatOfPersonOnWhichUHaveClicked] = useState([])
    const [loaderf, setloaderf] = useState(false)
    const [msgflag, setmsgflag] = useState(false)//for displaying new msgs

// to store the list of active users
const [activeUsers, setactiveUsers] = useState([])
  const socket =useRef();
useEffect(() => {
  
socket.current=io('ws://localhost:8000')//address of backend where server of socket is running
}, [])

  return (
    <AccountContext.Provider value={{Details,
    setDetails,
    chatOfPersonOnWhichUHaveClicked,
    setchatOfPersonOnWhichUHaveClicked,
    socket,
    activeUsers,
    setactiveUsers,
    loaderf,
    setloaderf,
    msgflag,
    setmsgflag
    }}>
        {props.children}
    </AccountContext.Provider>
  )
}

export default AccountState