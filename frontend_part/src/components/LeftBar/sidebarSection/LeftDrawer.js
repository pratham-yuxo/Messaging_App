import React from 'react'
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import Profile from './Profile';
//isopen and setisOpen is in props
const drawerCSS={
    width: "30.5%",
    minWidth:"270px",
    // minWidth:'auto'
}
const Profilebar=styled(Box)`
background: #ededed;
height: 100%;
`
const LeftDrawer = (props) => {
  return (
    <div >
         <Drawer
            open={props.isOpen}
            onClose={()=> props.setisOpen(false)}
            PaperProps={{sx:drawerCSS}}
          >
          
          <div style={{
            "paddingRight":"20px",
            "paddingLeft":"23px",
            "backgroundImage": "linear-gradient(#a00abb,#6621a4)",  
            "height":"123px",
            "display":"flex",
            "gap":"25px",
            "paddingTop":"45px",
            "alignItems":"center",
            "minWidth":"30%"
          }}>
            <ArrowBackIcon onClick={()=> props.setisOpen(false)}
            sx={{color:"white"}}
            />
            <p style={{"fontSize":"20px","color":'white'}}>Profile</p>
          </div>
<Profilebar>
    <Profile isOpen={props.isOpen}/>
</Profilebar>
          </Drawer>
    </div>
  )
}

export default LeftDrawer