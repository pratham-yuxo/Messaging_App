import React,{useState,useEffect} from 'react'
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import Profile from './Profile';
import {Animated} from "react-animated-css";

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
  const [isOpen, setisOpen] = useState(false)
  useEffect(() => {
    setisOpen(props.isOpen)
  
  }, [props.isOpen])
  const handleclose=()=>{
    setisOpen(false);
    setTimeout(() => {
      
      props.setisOpen(false)
    }, 100);
  }
  return (
    <div>
    <Drawer
            open={isOpen}

            anchor="left"
            onClose={handleclose}
            PaperProps={{sx:drawerCSS}}
            sx={{
              '& .MuiDrawer-paper': {
                  minWidth: "336px",
                  width: "35%"
              }
            }}
          >
    <div className='side' >
          
          <div  style={{
            "paddingRight":"20px",
            "paddingLeft":"23px",
            "backgroundImage": "linear-gradient(#a00abb,#6621a4)",  
            "height":"123px",
            "display":"flex",
            "gap":"25px",
            "paddingTop":"45px",
            "alignItems":"center",
            "minWidth":"336px"
          }}>
            <ArrowBackIcon onClick={()=> props.setisOpen(false)}
            sx={{color:"white"}}
            />
            <p style={{"fontSize":"20px","color":'white'}}>Profile</p>
          </div>
<Profilebar>
    <Profile isOpen={props.isOpen}/>
</Profilebar>
    </div>
          </Drawer>
          </div>
  )
}

export default LeftDrawer