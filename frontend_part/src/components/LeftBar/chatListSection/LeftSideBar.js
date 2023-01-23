import React,{useState,useContext,useRef,useEffect} from 'react'
import Header from './Header'
import ChatList from './ChatList'
import AddIcon from '@mui/icons-material/Add';
import { Box, styled } from '@mui/material'
import AccountContext from '../../../context/accountContext'

// import LeftDrawer from './LeftDrawer';

const LeftSideBar = () => {
  const {darkMode} = useContext(AccountContext);
  const [showBar, setShowBar] = useState(false)
  const Box1=styled(Box)`
position:absolute;
bottom:22px;
right:22px;
color:${darkMode?'white':'black'};
cursor:pointer;
// transform: rotate(${showBar?"45":"90"}deg);
// transition: transform 0.5s ease-in-out;
`
const Add=styled(AddIcon)`
// transition:  .5s;
`
const addref = useRef(null)
// useEffect(() => {
//   if (showBar) {
//     addref.current.classList.add('rotate');
//   } else {
//     addref.current.classList.add('rot');
//   }
// }, [showBar])
const handleClick=()=>{
  setShowBar(prev => !prev);  
}
  const [searchChatlist, setsearchChatlist] = useState('')
  return (
    <div >
        <Header searchChatlist={searchChatlist} setsearchChatlist={setsearchChatlist}/>
        <ChatList searchChatlist={searchChatlist}/>
        {/* <Box1 onClick={handleClick}> 

        <Add ref={addref}  fontSize='large'/>

        </Box1> */}
        </div>
  )
}

export default LeftSideBar  