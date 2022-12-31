import React, { useContext, useState } from 'react'
import accountContext from "../../../context/accountContext"
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import HeaderMenu from './HeaderMenu';
import LeftDrawer from '../sidebarSection/LeftDrawer';

const Header = (props) => {
    const [isOpen, setisOpen] = useState(false)
        const { Details } = useContext(accountContext)
    return (
        <div className='navbar'>
            <div className="image">
                <img src={Details.picture} alt="dp" onClick={()=>{setisOpen(true)}} />
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
                <TextField onChange={(e)=> props.setsearchChatlist(e.target.value)} size='small'   id="outlined-basic" label="Search chats" variant="outlined"
                InputProps={{
                    endAdornment:(
                        <InputAdornment position='end'>
                         <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiInputBase-root':{    borderRadius: '8px'}
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
        </div>
    )
}

export default Header