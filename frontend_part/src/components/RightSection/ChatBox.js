import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatHeader from './ChatHeader'
import MessageSection from './MessageSection'
import ChatFooter from './ChatFooter'
import AccountContext from '../../context/accountContext'
import { Animated } from "react-animated-css";
import { getConversation, sendMessage } from '../../allApis/forAdding'

const ChatBox = () => {
  const { msgflag, setmsgflag, chatOfPersonOnWhichUHaveClicked, Details, socket } = useContext(AccountContext)
  // when u clicked a chat then use effect will get all the chats through get conversation api and will pass it to message section as a prop
  const [conversation, setconversation] = useState({})
  const [value, setvalue] = useState('')// value is the text which is currently written in the field input
  const [file, setFile] = useState(null);//for sending file
  const [image, setimage] = useState('')
  const [incomingMsg, setincomingMsg] = useState(null)
  const [messageToDisplay, setmessageToDisplay] = useState([])

  useEffect(() => {
    const getMessages = async () => {
      let messages = await getConversation({ senderId: Details.email, receiverId: chatOfPersonOnWhichUHaveClicked.email })
      // console.log(messages)
      setconversation(messages);
    }
    getMessages();
  }, [chatOfPersonOnWhichUHaveClicked.email])
  //this will run whenever the person id changes or when you  click on a chat list item

  // socket stuff
  useEffect(() => {
    socket.current.on('getMessage', data => {
      setincomingMsg({
        ...data,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    incomingMsg && conversation?.members?.includes(incomingMsg.senderId) &&
      setmessageToDisplay(prev => [...prev, incomingMsg])

  }, [conversation, incomingMsg])


  const sendChat = async (e,val) => {
    //the e.which of enter key is 13
    // const code = e.which;
    let code = e.keyCode || e.which;
    if(!val) return;
    //here we will check if the key that has been pressed is enter or not

    if (code === 13) {
      let message = {};

      if (!file) {

        message = {
          senderId: Details.email,
          receiverId: chatOfPersonOnWhichUHaveClicked.email,
          conversationId: conversation._id,
          type: 'text',
          text: val,
        }
      }
      else {
        message = {
          senderId: Details.email,
          receiverId: chatOfPersonOnWhichUHaveClicked.email,
          conversationId: conversation._id,
          type: 'file',
          text: image,
        }
      }

      socket.current.emit('sendMessage', message);
      await sendMessage(message);
      setvalue('');
      setimage('');
      setFile('');
      setmsgflag(prev => !prev)// toggling the state
    }

  }
  return (
    <Box>
      <Animated
        animationIn='slideInDown'
        animationInDuration={400}
        // animationOut='flipInY'
        isVisible={true}>
        <ChatHeader person={chatOfPersonOnWhichUHaveClicked} />
      </Animated>
      
      <MessageSection  value={value} setmessageToDisplay={setmessageToDisplay} messageToDisplay={messageToDisplay} msgflag={msgflag} setmsgflag={setmsgflag} conversation={conversation} person={chatOfPersonOnWhichUHaveClicked} />
      <Animated
        animationIn='slideInUp'
        animationInDuration={400}
        // animationOut='flipInY'
        isVisible={true}>


        <ChatFooter setimage={setimage} setFile={setFile} file={file} setvalue={setvalue} value={value} conversation={conversation} sendChat={sendChat} />
      </Animated>
    </Box>
  )
}

export default ChatBox