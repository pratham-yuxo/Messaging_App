import React,{useContext} from 'react'
import { Box, styled } from '@mui/material'
import image from '../../images/emptyChat.png'
import AccountContext from '../../context/accountContext'
import emptyChatBlack from '../../images/emptyChatBlack.png'

const Box2=styled(Box)`
display:flex;
align-items:center;
justify-content:center;
height: 100vh;
align-items:flex-start;
`
const Box3=styled(Box)`
// border: 1px solid #6166ff;
border-radius:60px;
padding : 10px 20px;
// background: #ededed;
    font-weight: 600;
    // box-shadow: 1px 3.3px rgb(0 0 0 / 36%);
    margin-top: 115px;
    letter-spacing: 2.5px;
    font-size: 47px;
    font-family: Inspiration;
    text-shadow:  0 0 10px #5cc6ff, 0 0 10px #5cc6ff;
`
// 00b3f
const EmptyChat = () => {
    const { darkMode } = useContext(AccountContext)
    const Box1=styled(Box)`
    background-image: url(${darkMode?emptyChatBlack:image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    // ${darkMode && "filter:invert(1);"}
    `
  return (
   <Box1>
<Box2>
    <Box3>

Click a chat to start messaging
    </Box3>
</Box2>
   </Box1>
  )
}

export default EmptyChat