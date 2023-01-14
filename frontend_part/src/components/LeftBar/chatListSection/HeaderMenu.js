import React,{useState,useContext} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import { googleLogout } from '@react-oauth/google';
import AccountContext from "../../../context/accountContext"
import SwitchC from './SwitchC';
import { useNavigate } from 'react-router-dom'

const HeaderMenu = (props) => {
    const [isMenuOpen, setisMenuOpen] = useState(null)
let open=Boolean(isMenuOpen)
    const handleClick=(e)=>{
       setisMenuOpen(e.currentTarget);
    }
    const handleClose=()=>{
       setisMenuOpen(null);
    }
const MenuStyle=styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color: 4A4A4A;

`
// to logout
const {darkMode,setDialogbox,setDetails,socket,setchatOfPersonOnWhichUHaveClicked } = useContext(AccountContext)
let history = useNavigate();

const logout=()=>{
  handleClose();
  setDetails(null);
  setchatOfPersonOnWhichUHaveClicked('');
  socket.current.disconnect();
  googleLogout();
  localStorage.removeItem('token')

  history('/login');

}
  return (
    <div className='menuu'>
         <MoreVertIcon style={{"color":`${darkMode?"#aebac1":"#54656f"}` }} onClick={ handleClick}/>
         <Menu
        id="basic-menu"
        anchorEl={isMenuOpen}
        // getContentAnchorE1={null}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
      >
        {/* onclicking this profile option both handleclose and set isopen will run */}
        <MenuStyle onClick={()=>{handleClose(); props.setisOpen(true)}}>Profile</MenuStyle>
        <MenuStyle onClick={()=>{handleClose();setDialogbox(true)}}>Add a new chat</MenuStyle>
        <MenuStyle >Dark Mode <SwitchC/></MenuStyle>
        <MenuStyle onClick={logout}>Logout</MenuStyle>
      </Menu>
    </div>
  )
}

export default HeaderMenu
/*
 */