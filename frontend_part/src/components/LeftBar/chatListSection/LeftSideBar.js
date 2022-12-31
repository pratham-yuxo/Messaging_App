import React,{useState} from 'react'
import Header from './Header'
import ChatList from './ChatList'
// import LeftDrawer from './LeftDrawer';

const LeftSideBar = () => {
  const [searchChatlist, setsearchChatlist] = useState('')
  return (
    <div style={{
      // "display":"flex",
      // "flexDirection":"column"
    }}>
        <Header setsearchChatlist={setsearchChatlist}/>
        <ChatList searchChatlist={searchChatlist}/>
        </div>
  )
}

export default LeftSideBar  