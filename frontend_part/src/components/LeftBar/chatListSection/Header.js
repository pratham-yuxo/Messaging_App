import React, { useContext, useState } from 'react'
import accountContext from "../../../context/accountContext"
import SearchIcon from '@mui/icons-material/Search';
import {TextField,Box,styled} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import HeaderMenu from './HeaderMenu';
import LeftDrawer from '../sidebarSection/LeftDrawer';
const Header = (props) => {
    const [isOpen, setisOpen] = useState(false)
    const { Details,darkMode } = useContext(accountContext)
    const Box1=styled(Box)`
    display: flex;
    width: 100%;
    /* flex-direction: column; */
    padding: 10px 16px;
    background-color: ${darkMode?"#202c33":"#ededed"};
    padding-right: 8px;
    `
    const CssTextField = styled(TextField)`
   ${ darkMode &&  {
        '& .MuiFormLabel-root':{
            color:'#aebac1'
        },
        '& label.Mui-focused': {
          color: 'aqua',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'aqua',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#aebac1',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'aqua',
          },
        }
      }}`;
const [val, setval] = useState('');

const handleChange = (e) => {
  const newVal = e.target.value;
  requestAnimationFrame(() => {
      setval(newVal);
      props.setsearchChatlist(newVal);
  });

}
const handleOpen=()=>{
  setisOpen(true);
}



    return (
        <Box1 >
            <div className="image">
                <img src={Details.picture} alt="dp" onClick={handleOpen} />
            </div>
            <div style={{"display":"flex"}}>
                <div className="search" style={{
                    "padding":"8px",
                    "height":"40px",
                    "position":"relative",
                    "top":"-8px",
                    "paddingRight":"0px"

                    }}>
                    <div>
                     
                <CssTextField
                value={val}
                autoFocus={val===''?false:true}
                 onChange={handleChange} size='small'   id="outlined-basic" label="Search chats" variant="outlined"
                InputProps={{
                    endAdornment:(
                        <InputAdornment  position='end'>
                         <SearchIcon style={{color:"#aebac1"}}/>
                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiInputBase-root':{    
                        borderRadius: '8px',
                        
                }
                }}/>
                    </div>
                    <div>
               
                    </div>
                </div>
                <div className="more" style={{"padding":"8px","height":"40px","paddingRight":"0px"}}>
                   
                    <HeaderMenu setisOpen={setisOpen}/>
                    {/* passing setisopen to header menu to open left drawer on clicking movert icon */}
                </div>
            </div>
            <LeftDrawer isOpen={isOpen} setisOpen={setisOpen}/>
        </Box1>
    )
}

export default Header