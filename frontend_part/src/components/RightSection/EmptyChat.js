import React from 'react'
import { Box, styled } from '@mui/material'
import image from './logoo.jpg'

const Box1=styled(Box)`
background-image: url(${image});

`
const Box2=styled(Box)`
display:flex;
align-items:center;
justify-content:center;
height: 100vh;
`
const Box3=styled(Box)`
border: 1px solid black;
border-radius:20px;
padding : 10px 20px;
background: #ededed;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 1px 3.3px rgb(0 0 0 / 36%);
`
const EmptyChat = () => {
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