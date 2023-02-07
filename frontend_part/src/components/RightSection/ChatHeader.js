import React,{useContext} from 'react'
import { Box, styled,Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
// import defaultI from '../../images/new2.png'
import AccountContext from '../../context/accountContext';
import noUser from '../../images/new4.png'
import VideocamIcon from '@mui/icons-material/Videocam';
//       ------------styling----------------

const Box3 = styled(Box)`
flex-grow:1;
`
const Box2 = styled(Box)`
padding: 0 15px 0 0;
margin-top: -1px;
flex: none;
 & >img {
// height: 56px;
// width: 56px;
height: 40px;
width: 40px;
border-radius:50%;
 }
`
const Box4 = styled(Box)`
display: flex;
align-items:center;
justify-content:center;
margin-left: 20px;
`
const Box5 = styled(Box)`
padding: 8px 8px;
color: #54656f;
margin-left: 10px;
`
const Box6= styled(Box)`
padding: 8px 8px;
margin-left: 10px;
color: #54656f;
`


const ChatHeader = (props) => {
    const {setVideoCall,activeUsers,darkMode} = useContext(AccountContext)
    const startVideocall=()=>{
        setVideoCall(true);
    }
    const Typography1=styled(Typography)`
   color: ${darkMode?"white":"black"}
    `
    
    const Box1 = styled(Box)`
    border-left: 1px solid ${darkMode?"#000000":" #d1d7db"} ;
    padding: 10px 16px;
    position: relative;
        z-index: 1000;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 59px;
        background-color:${darkMode?'#202c33':"#ededed"};
    `
    return (
        <Box1>

            <Box2>
                <img src={props.person.picture || noUser} alt="dp" />
            </Box2>

            {/* conact name */}
            <Box3>
                <Typography1>{props.person.name}</Typography1>
                <Typography1 style={{"fontSize":"12px","color":`${darkMode?"#8696a0":"rgb(0,0,0,0.6)"}`}}>{activeUsers.find(user=>user.email===props.person.email)?'online':"offline"}</Typography1>
            </Box3>

            {/* icons */}  
            <Box4>
                {/* video call icon */}
            <Box5 onClick={startVideocall}>
                <VideocamIcon/>
            </Box5>
                {/* search */}
                <Box5>
                    <SearchIcon/>
                </Box5>

            {/* movert */}
                <Box6>
            <MoreVertIcon/>

                </Box6>

            </Box4>
        
        </Box1>
    )
}

export default ChatHeader