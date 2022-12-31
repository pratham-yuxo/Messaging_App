import React,{useContext,useEffect,useState} from 'react'
import { Box,styled } from '@mui/material'
import AccountContext from '../../../context/accountContext'
import { setConversation,getConversation } from '../../../allApis/forAdding'
import {Animated} from "react-animated-css";

const Box2= styled(Box)`
padding : 0 15px 0 13px;
display : flex;
align-items:center;
height: 72px;
`
const Box1= styled(Box)`
display : flex;
cursor: pointer;
`
const Box3= styled(Box)`
padding-right:15px;
display: flex;
flex-basis: auto;
flex-direction: column;
flex-grow: 1;
justify-content: center;
min-width: 0;
`
const Box6=styled(Box)`

`
const Box4=styled(Box)`

`
const Box5=styled(Box)`

`
const ChatListItem = (props) => {
  const {msgflag,setchatOfPersonOnWhichUHaveClicked,Details} = useContext(AccountContext)
  const [message, setMessage] = useState({});
  const showChat= async ()=>{
    await setConversation({senderId:Details.sub,receiverId:props.user.sub})
    setchatOfPersonOnWhichUHaveClicked(props.user);
  }

  useEffect(() => {
    const getConversationDetails=async()=>{
      const data=  await getConversation({senderId:Details.sub,receiverId:props.user.sub})
      setMessage({text: data.message,timestamp:data.updatedAt});
    }
    getConversationDetails();
  }, [msgflag])
  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const mins = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
  }
  return (
    <Animated
                animationIn='slideInDown'
                animationInDuration={200}
                // animationOut='slideInUp'
                isVisible={true}>

    <Box1 onClick={showChat}>
      <Box2 >
        <img style={{
          "height":"49px",
          "width":"49px",
          "borderRadius":"50%",
        }} src={props.user.picture} alt="" />
      </Box2>
      <Box3>
        
      <Box4> {props.user.name}</Box4> 
        {/* checking if msg exist then displaying date */}
        <Box5>{message.text && formatDate(message.timestamp)}</Box5>
        {/* /checking if if is a text or document */}
       <Box6> {message?.text?.includes('localhost')?'media':message.text}</Box6>
      </Box3>
    </Box1>
          </Animated>
  )
}

export default ChatListItem