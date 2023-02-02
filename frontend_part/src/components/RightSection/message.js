import React, { useContext, useState, useEffect, useRef } from 'react'
import { Box, styled, Typography } from '@mui/material'
import AccountContext from '../../context/accountContext'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import pdf from '../../images/pdf.png'
import file from '../../images/file.png'
import Loader from './Loader';
import AudioMessage from './messageTypes/AudioMessage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DeleteForEveryone, DeleteForMe } from '../../allApis/forAdding';
import BlockIcon from '@mui/icons-material/Block';
const downloadFile = (e, imageUrl) => {
  e.preventDefault();
  try {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const Url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = "none";
        a.href = Url;

        const name = imageUrl.split('/').pop();
        a.download = "" + name + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(Url);
      }).catch(error => console.log("error while downloading image", error))
  } catch (error) {
    console.log("error at messages downloading", error);
  }
}
const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const mins = new Date(date).getMinutes();
  return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
}

const DateMsg = styled(Typography)`
word-break:keep-all;// because we dont want to display date in two lines
font-size: 10px;
margin: auto 0 -5px 4px;
// float: right;
color:hsla(0,0%,100%,0.6);
position: relative;
height:100%;
`
const myStyle = {
  "fontSize": "14.2px",
  "fontFamily": " Segoe UI",
  "wordBreak": "break-word",
  "position": "relative",
  color:"black"
}

const ExpandMoreIcon1=styled(ExpandMoreIcon)`
position: absolute;
    top: 0px;
    right: 0px;

`


const Message = (props) => {
  const { Details, darkMode } = useContext(AccountContext)
  let isSender = Details.email === props.message.senderId;
  const [showMore, setShowMore] = useState(false);
  const msgref = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const anchorRef = useRef(null);
  const [isDel, setIsDel] = useState(false);
  const [delEve, setDelEve] = useState(false)
  const delStyle={
    position:`${isDel && "absolute"}`,
    visibility:`${isDel && "hidden"}`,
    top:`${isDel && "10px"}`
  }
  const BoxMore = styled(Box)`
  top: 0px;
      position: absolute;
      right: 0px;
      background: linear-gradient(15deg,rgba(11,20,26,0),rgba(11,20,26,0) 45%,rgba(11,20,26,.12) 70%,rgba(11,20,26,.33));
      width: 60%;
      
      border-top-right-radius: 7.5px;
      border-top-left-radius: 3px;
          height: 40px;
  
  `
  const MenuStyle=styled(MenuItem)`
font-size:14px;
padding:15px 60px 5px 24px;
color: 4A4A4A;

`
  const BoxMenu = styled(Box)`
  
  
  `

  const Box1 = styled(Box)`
  position:relative;
  background:${isSender ? darkMode ? "linear-gradient( 180deg, #9611b9 0%, rgb(10 61 155) 51%, #1a7eed 92% ) no-repeat center" : "#4955e9;" : darkMode ? "#243156" : "white"};
  // #dbdbdb
  max-width: 60%;
  margin-${isSender ? "left" : "right"}:auto;
  width:fit-content;
  padding: 6px 7px 8px 9px;
  display:flex;
  border-radius: 7.5px;
  word-break:break-word;
  box-shadow: 0 1px 0.5px rgba(11,20,26,.13);
  margin-${isSender ? "right" : "left"}: 64px;
  background-attachment: ${isSender && "fixed"};
  color:${darkMode ? '#e9edef' : 'white'};
  margin-bottom: 1px;
  `

  const handleClose=()=>{
    setIsMenuOpen(null);
 }
 const handleDelete=()=>{
  const del=async()=>{
   const res= await DeleteForEveryone(props.message._id);
   if (res.data.success) {
    console.log("deleted successfully");
    // setIsDel(true);
    setDelEve(true);
    setIsMenuOpen(false);
   }
   else{
    console.log("try deleting again")
   }

  }
  del();
}
const handleDeleteForMe=()=>{
  const del=async()=>{
    const res= await DeleteForMe(props.message._id);
    if (res.data.success) {
      console.log("deleted successfully");
      // anchorRef.current.classList.add('del');
      setIsDel(true);
      setIsMenuOpen(false);
     }
     else{
      console.log("try deleting again")
     }
  }
del();
}
  const TextMsg = () => {
    return (<>
      {
        <span className={`${isSender ? "msg" : `${darkMode ? "recd" : "rec"}`}`} style={myStyle}>{props.message.text}</span>
      }

    </>)
  }

  // img message denotes that either the message is image or any other type of format but not a text
  let isImg = /\.png|\.jpg|\.webp|\.jpeg/.test(props.message.text);
  let isPdf = props.message.text.includes('.pdf');
  let isAudio = props.message.text.includes('.mp3');
  const ImgMsg = () => {
    const [isLoading, setIsLoading] = useState(true);
    let src = props.message.text;
    const handleLoad = () => {
      setIsLoading(false);
    }

    return (<>
      <Box>
        {

          // if it is a pdf
          isPdf ?
            <Box className={`${isSender ? "msg" : `${darkMode ? "recd" : "rec"}`}`} style={{ position: "relative" }}>
              <img src={pdf} alt="file" />
              <Typography style={{
                width: "101px",
                fontSize: "13px"
              }}>
                {props.message.text.split('/').pop()}
              </Typography>
            </Box>
            :
            isAudio ?

              <AudioMessage isSender={isSender} message={props.message} />
              // if it is a image or any other file
              :
              <div className={`${isSender ? "msg" : `${darkMode ? "recd" : "rec"}`}`} style={{ position: "relative" }}>
                {isImg && isLoading && <div style={{
                  position: "absolute",
                  top: "70px",
                  right: '70px',

                }}><Loader /></div>}

                <img src={isImg ? src : file} alt={props.message.text} style={{
                  objectFit: "cover",
                  height: `${isImg ? '180px' : "130"}`,
                  width: `${isImg ? '203px' : ""}`
                }} onLoad={handleLoad} />

              </div>
        }
      </Box>
      <Box style={{ position: "relative" }}>

        {/* <FileDownloadIcon fontSize='small'
          onClick={(e) => downloadFile(e, props.message.text)}//props.message.text contains url
          style={{
            position: "absolute", bottom: "0", right: "-27px",
            borderRadius: "50%",
            border: "1px solid black",
            cursor: "pointer"

          }} /> */}
      </Box>
    </>)
  }
  const DeleteMsg=()=>{

    const BoxMain=styled(Box)`
    padding: 2px 7px 3px 0px;
    display: flex;
}
    `
    const BoxIcon=styled(Box)`
    font-size:1px;
    margin-right:6px;
    color: #852828;
    `
    const Text=styled(Box)`
    font-size: 14px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    font-weight: 600;
    color: #852828;
    font-style: italic;
    line-height: 19px;
    `
    const Icon=styled(BlockIcon)`
    font-size:18px;
    `
    return (<>
    <BoxMain>
      <BoxIcon>
        <Icon/>
      </BoxIcon>
      <Text>
        You deleted this message
      </Text>
    </BoxMain>
    
    </>)
  }
  return (
    <div ref={anchorRef}>


      <Box1  style={ delStyle}  onMouseEnter={() =>{msgref.current.classList.remove('show');         
}}
onMouseLeave={() => { msgref.current.classList.add('show');         
}}>
             
        <BoxMore onClick={()=> setIsMenuOpen(true)} className='show' ref={msgref}>

          <ExpandMoreIcon1 />
        </BoxMore>
        <BoxMenu>
        <Menu
        id="msg-menu"
        anchorEl={anchorRef.current}
        // getContentAnchorE1={null}
        keepMounted
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
      >
                <MenuStyle onClick={handleDelete} >Delete for everyone</MenuStyle>
                <MenuStyle onClick={handleDeleteForMe} >Delete for me</MenuStyle>
        <MenuStyle  onClick={(e) => downloadFile(e, props.message.text)} >Download</MenuStyle>
          <MenuStyle>Add to Starred</MenuStyle>
        </Menu>
        </BoxMenu>
        {
          props.message.type === 'file' ? <ImgMsg /> :
          props.message.type==='deleted'|| delEve?<DeleteMsg/>:<TextMsg />
        }


        <DateMsg>{formatDate(props.message.createdAt)}</DateMsg>
      </Box1>
    </div>

  )
}

export default Message