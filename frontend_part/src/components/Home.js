import React,{useContext,useEffect} from 'react'
import ChatBox from "./RightSection/ChatBox"
import LeftSideBar from "./LeftBar/chatListSection/LeftSideBar"
import EmptyChat from './RightSection/EmptyChat'
import AccountContext from '../context/accountContext'


// "maxWidth":"46%",
// "minWidth":"344px",
// "width":"436px",
// "height":"100vh",
// "background":"#fff"
const chat={
"width":"70%",
"minWidth":"501px",
"height":"100%",
"borderLeft":"1px solid rgba(0,0,0,0.2) !important"
}
const Home = () => {
  const {chatOfPersonOnWhichUHaveClicked,loader,socket} = useContext(AccountContext);
  useEffect(() => {
    socket.current.connect();

  }, [])
  
  const sideBar={
    "maxWidth":"45%",
    "minWidth":"270px",
    "width":"30%",
    "height":"100vh",
    "background":"#fff",
    pointerEvents: `${loader?'none':'auto'}`
    
  }
  const upperDiv={
    "display":"flex",
    opacity: `${loader?'.9':'1'}`,
  }
  return (
    <div style={upperDiv}>
      <div style={sideBar}>
        <LeftSideBar />

      </div>

      <div style={chat}>

        {Object.keys(chatOfPersonOnWhichUHaveClicked).length? <ChatBox />: <EmptyChat/>}
      </div>

{/* Object.keys() --> will give you all the keys of your object ,if nothing is present then it will return a zero otherwise list of keys */}
    </div>
  )
}

export default Home