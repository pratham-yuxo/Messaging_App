import React, { useContext, useEffect } from 'react'
import ChatBox from "./RightSection/ChatBox"
import LeftSideBar from "./LeftBar/chatListSection/LeftSideBar"
import EmptyChat from './RightSection/EmptyChat'
import AccountContext from '../context/accountContext'
import AddDialog from './AddFriendSection/AddDialog'
import { useNavigate } from 'react-router-dom'
import { fetchDetails } from '../allApis/forAdding'

// "maxWidth":"46%",
// "minWidth":"344px",
// "width":"436px",
// "height":"100vh",
// "background":"#fff"

const Home = () => {

  let history = useNavigate();
  const { darkMode, dialogbox, setDetails, Details, chatOfPersonOnWhichUHaveClicked, loader, socket } = useContext(AccountContext);
  const chat = {
    "width": "70%",
    "minWidth": "501px",
    "height": "100%",
    position:"relative",
    "borderLeft": `1px solid ${darkMode ? "#000000" : "rgba(0,0,0,0.2)"} !important`,
    flex: '1'
  }
  useEffect(() => {
    // console.log("Details")

    const fun = async () => {
      if (localStorage.getItem('token')) {
        let details;

          details = await fetchDetails();
          console.log("details by fetching",details)
          setDetails(details);
          if (!details) {
            history('/login');

          
        }
      }
      else {
        console.log("here")
        history('/login');
      }

    }
    fun();



  }, [])

  useEffect(() => {
    socket.current?.connect();

  }, [])

  const sideBar = {
    "maxWidth": "45%",
    "minWidth": "336px",
    "width": "400px",
    "height": "100vh",
    "background": `${darkMode ? '#111b21' : '#fff'}`,
    pointerEvents: `${loader ? 'none' : 'auto'}`,
    position:"relative"

  }
  const upperDiv = {
    "display": "flex",
    opacity: `${loader ? '.9' : '1'}`,
  }
  return (
    <div >


      {dialogbox && <div style={{ position: "relative" }}><AddDialog /></div>}
      {Details && <div style={upperDiv}>

        <div style={sideBar}>
          <LeftSideBar />

        </div>

        <div style={chat}>
          {console.log("home")}
          {Object.keys(chatOfPersonOnWhichUHaveClicked).length ? <ChatBox /> : <EmptyChat />}
        </div>

        {/* Object.keys() --> will give you all the keys of your object ,if nothing is present then it will return a zero otherwise list of keys */}
      </div>}
    </div>
  )
}

export default Home