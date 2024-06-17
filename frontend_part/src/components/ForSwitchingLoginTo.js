import React from 'react'
import AccountContext from '../context/accountContext';
import { useContext } from 'react';
import LoginBox from "./LoginBox"
import Home from './Home';

const ForSwitchingLoginTo = () => {
  console.log("Details",Details)
    const {Details}= useContext(AccountContext)
  return (
    <>
          
        {  Details ?<Home/>:<LoginBox />}
       
         </>
  )
}

export default ForSwitchingLoginTo