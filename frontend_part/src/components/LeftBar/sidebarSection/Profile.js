import React, { useContext, useState, useRef, useEffect } from 'react'
import { Box } from '@mui/system'
import AccountContext from '../../../context/accountContext'
import styled from '@emotion/styled'
import { Animated } from "react-animated-css";
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import CheckIcon from '@mui/icons-material/Check';
import { EditBio, editImage, editName } from '../../../allApis/forAdding';
import Loader from '../../RightSection/Loader';
import { uploadFile } from '../../../allApis/forAdding';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';

const ariaLabel = { 'aria-label': 'description' };

const Profile = (props) => {


    const Box2 = styled(Box)`
    display:flex;
    flex-direction:column;
    background-color:white;
    justify-content:center;
    padding-top:14px;
    padding-bottom:10px;
    padding-right:50px;
    padding-left:30px;
    box-shadow: 1px 3.3px rgba(0,0,0,0.09);
    font-size:17px;
    
    `
    const Box3 = styled(Box)`
    display:flex;
    justify-content:center;
    padding:28px 0px;
    font-size: 14px;
    color: #8696a0;
    `
    const Box4 = styled(Box)`
    background-color:white;
    padding-top: 14px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 01px 3.3px rgba(0,0,0,0.09);

    `
    const Box5 = styled(Box)`
    cursor: pointer;
    right: -5px;
    bottom: 10px;
    position: absolute;

    `
    const BoxEdit = styled(Box)`
    align-items: center;
    margin: 8px 0px;
    display: flex;
    height:25px;
    justify-content: space-between;

    `
    const Boxedit = styled(Box)`
    align-items: center;
    display: flex;
    color:white;
    border-radius:6px;
    font-size: 12px;
    padding: 4px 8px;
    gap:5px;
    background:#0d1117;

    `
    const Boxi = styled(Box)`
background-color:#6e7680;
border-radius:6px;
font-size:11px;
color:white;
padding: .5em .75em;
font: normal normal 11px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
text-align:center;
position: absolute;
right: 14px;
    `


    const { Details, setDetails } = useContext(AccountContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredBio, setIsHoveredBio] = useState(false);
    const [edit, setedit] = useState(false);
    const [editBio, seteditBio] = useState(false);
    const [val, setVal] = useState(Details.name);
    const [editvisibility, seteditvisibility] = useState(false)
    const [isHoveredImg, setIsHoveredImg] = useState(false);
    const [file, setfile] = useState(null);
    const [imageUrl, setimageUrl] = useState(null)
    const bioref = useRef(null)
    useEffect(() => {
        if (imageUrl) {
            const edit = async () => {

                await editImage(imageUrl, Details._id);
            }
            edit();
        }

    }, [imageUrl])

    useEffect(() => {

        // await sendMessage()
        const upload = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                // setloaderf(true);
                let response = await uploadFile(data);
                // response && setloaderf(false);
                // props.setimage(response.data);
                console.log(response.data)
                setimageUrl(response.data);
                // console.log("efs")
                // response.data is the link to download file

            }

        }
        upload();
    }, [file])
    const handleClick = () => {

        // const inputValue = inputRef;
        const edit = async () => {

            const res = await editName(val, Details._id);
            if (res.data.success) {
                const updatedDetails = { ...Details, name: val };
                setDetails(updatedDetails);
                setedit(false);
            }
            else {
                console.log("try again to change name")
            }
        }
        edit();

    }
    const handleBio=()=>{
                const edit = async () => {

            const res = await EditBio(bioref.current.value, Details._id);
            if (res.data.success) {
                const updatedDetails = { ...Details, bio: bioref.current.value };
                setDetails(updatedDetails);
                seteditBio(false);
            }
            else {
                console.log("try again to change name")
            }
        }
        edit();
        console.log(bioref.current.value,"bio ");
    }
    const handleChange = (e) => {
        setVal(e.target.value);
    }
    const onchange = (e) => {
        setfile(e.target.files[0])// file is present in a event ,on 0th value of files array
        console.log(e)
        // props.setvalue(e.target.files[0].name)
    }
    return (
        // pseudo selector first child & : first child{css}
        <div>
            <Box style={{
                "display": "flex",
                "justifyContent": "center",
                "padding": "28px 0px"
            }}>

                <Animated
                    animationIn='zoomIn'
                    animationInDuration={500}
                    animationOut='flipInY'
                    isVisible={props.isOpen}>
                    <div style={{ position: "relative" }} onMouseEnter={() => setIsHoveredImg(true)}
                        onMouseLeave={() => setIsHoveredImg(false)}>

                        <img style={{
                            "borderRadius": "100px",
                            "height": "190px",
                            'width': "190px",
                            cursor: "pointer"
                        }} src={Details.picture}
                            onClick={() => seteditvisibility(true)} alt="dp" />

                        {editvisibility && <Box5>
                            <label htmlFor='fileInput'>
                                <Boxedit>
                                    <div>Edit</div>
                                    <EditIcon style={{ cursor: "pointer", fontSize: "17px" }} fontSize='small' />
                                </Boxedit>

                            </label>
                            <input type="file" id='fileInput'
                                onChange={(e) => onchange(e)}
                                style={{
                                    display: 'none',
                                }} />
                        </Box5>}

                        {isHoveredImg && <Boxi className='badge'>
                            Change ypur Profile photo
                        </Boxi>}

                    </div>
                </Animated>


            </Box>
            <Box2>
                <div style={{ "paddingBottom": "14px", "fontSize": "14px", "color": "#6621a4" }}>Your Name</div>
                <BoxEdit onMouseEnter={() => !edit && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {!edit ? <div>{Details.name}</div> :
                        <Input value={val}
                            onChange={handleChange} />}
                    {!edit && isHovered && <div onClick={() => setedit(true)} style={{ cursor: "pointer" }}><EditIcon fontSize='small' /></div>}
                    {edit && <CheckIcon onClick={handleClick} style={{ cursor: "pointer" }} />}
                </BoxEdit>
            </Box2>
            <Box3>
                <span>This name will be visible to your friends</span>
            </Box3>
            <Box4 onMouseEnter={() =>{!editBio && setIsHoveredBio(true)}}
                onMouseLeave={() => {!editBio && setIsHoveredBio(false)}}>
                <div style={{ "marginBottom": "14px" }}>
                    <span style={{ "fontSize": "14px", }}>Bio</span>
                </div>
                <div style={{ 'margin': '8px 0px', "borderBottom": "2px solid transparent", display: "flex", gap: "26px" }}>
                   {!editBio ? <span style={{ "fontSize": "14px", wordBreak: "break-all" }}>{Details.bio||"Add your Bio to complete your profile"}</span>
                   :              <TextField
                   id="standard-multiline-static"
                   variant="standard"
                   multiline
                   maxRows={4}
                   inputRef={bioref}


                 />
                   }
                    {!editBio && isHoveredBio && <div onClick={() => seteditBio(true)} style={{
                        cursor: "pointer", right: "16px",
                        position: "absolute"
                    }}><EditIcon fontSize='small' /></div>}
                    {editBio && <CheckIcon onClick={handleBio} style={{ cursor: "pointer" }} />}


                </div>
            </Box4>
        </div>
    )
}

export default Profile