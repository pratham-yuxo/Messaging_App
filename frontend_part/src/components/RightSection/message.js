import React, { useContext, useState, useEffect } from 'react'
import { Box, styled, Typography } from '@mui/material'
import AccountContext from '../../context/accountContext'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import pdf from '../../images/pdf.png'
import file from '../../images/file.png'
import Loader from './Loader';
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
margin: -6px 0 -5px 4px;
float: right;
position: relative;
height:100%;
`
const myStyle = {
  "fontSize": "14.2px",
  "fontFamily": " Segoe UI",
  "wordBreak": "break-word",
  "position": "relative"
}



const Message = (props) => {
  const { Details } = useContext(AccountContext)
  let isSender = Details.sub === props.message.senderId;


  const Box1 = styled(Box)`
  background:${isSender ? "linear-gradient( 180deg, rgba(139, 47, 184, 1) 0%, rgba(103, 88, 205, 1) 51%, rgba(89, 116, 219, 1) 92% ) no-repeat center" : " #6ed76e"};
  max-width: 60%;
  margin-${isSender ? "left" : "right"}:auto;
  width:fit-content;
  padding: 6px 7px 8px 9px;
  display:flex;
  border-radius: 7.5px;
  word-break:break-word;
  box-shadow: 0 1px 0.5px rgba(11,20,26,.13);
  margin-${isSender ? "right" : "left"}: 64px;
  // background: linear-gradient( 180deg, rgba(139, 47, 184, 1) 0%, rgba(103, 88, 205, 1) 51%, rgba(89, 116, 219, 1) 92% ) no-repeat center;
  background-attachment: ${isSender && "fixed"};
  // margin-bottom:2px;
  `
  const TextMsg = () => {
    return (<>
      {
        <span className={`${isSender ? "msg" : "rec"}`} style={myStyle}>{props.message.text}</span>
      }

    </>)
  }

  // img message denotes that either the message is image or any other type of format but not a text
  let isImg = /\.png|\.jpg|\.webp|\.jpeg/.test(props.message.text);
  const ImgMsg = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    let src = props.message.text;
    useEffect(() => {
      const image = new window.Image();

      image.src = src;
      image.onload = () => setIsLoading(false);
      image.onerror = () => setImageError(true);

      return () => {
        // Make sure to revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(image.src);
      };
    }, [src]);
    return (<>
      <Box>
        {console.log(props.message.text)}
        {
          // if it is a pdf
          props.message.text.includes('.pdf') ?
            <Box className={`${isSender ? "msg" : "rec"}`} style={{ position: "relative" }}>
              <img src={pdf} alt="file" />
              <Typography style={{
                width: "101px",
                fontSize: "13px"
              }}>
                {props.message.text.split('/').pop()}
              </Typography>
            </Box>
            :
            // if it is a image

            <div className={`${isSender ? "msg" : "rec"}`} style={{ position: "relative" }}>
              {isImg && isLoading && <div style={{
                position: "absolute",
                top: "70px",
                right: '70px',

              }}><Loader /></div>}
              <img src={isImg ? src : file} alt={props.message.text} style={{
                objectFit: "cover",
                height: "180px",
                width: `${isImg ? '203px' : ""}`
              }} />
              <Typography style={{
                width: `${isImg ? '200px' : "101px"}`,
                fontSize: "13px"
              }}>
                {props.message.text.split('/').pop()}
              </Typography>
            </div>
        }
      </Box>
      <Box style={{ position: "relative" }}>

        <FileDownloadIcon fontSize='small'
          onClick={(e) => downloadFile(e, props.message.text)}//props.message.text contains url
          style={{
            position: "absolute", bottom: "0", right: "-27px",
            borderRadius: "50%",
            border: "1px solid black",
            cursor: "pointer"

          }} />
      </Box>
    </>)
  }
  return (
    <>


      <Box1 >
        {
          props.message.type === 'file' ? <ImgMsg /> : <TextMsg />
        }


        <DateMsg>{formatDate(props.message.createdAt)}</DateMsg>
      </Box1>
    </>

  )
}

export default Message