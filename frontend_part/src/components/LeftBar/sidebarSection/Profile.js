import React, { useContext } from 'react'
import { Box } from '@mui/system'
import AccountContext from '../../../context/accountContext'
import styled from '@emotion/styled'
import {Animated} from "react-animated-css";

const Profile = (props) => {
    const {Details}=useContext(AccountContext)
    const Box2=styled(Box)`
    display:flex;
    flex-direction:column;
    background-color:white;
    justify-content:center;
    padding-top:14px;
    padding-bottom:10px;
    padding-right:30px;
    padding-left:30px;
    box-shadow: 01px 3.3px rgba(0,0,0,0.09);
    font-size:17px;
    
    `
    const Box3=styled(Box)`
    display:flex;
    justify-content:center;
    padding:28px 0px;
    font-size: 14px;
    color: #8696a0;
    `
    const Box4=styled(Box)`
    background-color:white;
    padding-top: 14px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 01px 3.3px rgba(0,0,0,0.09);

    `
  return (
    // pseudo selector first child & : first child{css}
    <div>
        <Box style={{
            "display":"flex",
            "justifyContent":"center",
            "padding":"28px 0px"
        }}>
                
            <Animated
                animationIn='zoomIn'
                animationInDuration={500}
                animationOut='flipInY'
                isVisible={props.isOpen}>
                {console.log("first",props.isOpen)}
            <img style={{
                "borderRadius":"100px",
                "height":"190px",
                'width':"190px"
            }} src={Details.picture} alt="dp" />
            </Animated>
            
            
        </Box>
        <Box2>
        <div style={{"paddingBottom":"14px","fontSize":"14px","color":"#6621a4"}}>Kimi No Nawa</div>
        <div style={{"margin":"8px 0px"}}>
            <div>{Details.name}</div>
        </div>
        </Box2>
        <Box3>
            <span>This name will be visible to your contacts</span>
        </Box3>
        <Box4>
            <div style={{"marginBottom":"14px"}}>
                <span style={{"fontSize":"14px",}}>About</span>
            </div>
            <div style={{'margin':'8px 0px',"borderBottom":"2px solid transparent"}}>
                <span style={{"fontSize":"17px"}}>mera about section</span>
            </div>
        </Box4>
    </div>
  )
}

export default Profile