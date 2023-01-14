// for now accountContext exports all of my context 
import React, { useRef,useContext,useState } from 'react';
// material ui
import { Dialog,AppBar,Toolbar,styled,Box } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
// import { Link } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import AccountContext from '../context/accountContext';
//importing valuse from accountstate 
import {Animated} from "react-animated-css";
import { createUser } from '../allApis/forAdding';
// images
import logo from "../images/ogol.png";
import { useNavigate } from 'react-router-dom'
import bg1 from '../images/bg4.png';
import {OutlinedInput,FormControl,IconButton,InputAdornment,InputLabel,Input} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';


const NavBar = styled(AppBar)`
height:180px;
background-image: linear-gradient(#a00abb,#6621a4);
`

const Box1=styled(Box)`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
& > img{
  height:90px;
  margin: 10px;
}
`
const Box2=styled(Box)`
font-weight:600;
    font-size: 34px;
    font-size: 23px;
font-family: 'Libre Baskerville';
// font-family: 'Inspiration';
color:black;
margin-bottom:10px;

`
const BoxMain=styled(Box)`
height: 87vh;
    overflow: scroll;
    overflow-x: hidden;
    // background-color: rgba(0, 0, 0, 0.2);
    background-color:white;
    border-radius:25px;
`
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const ref = useRef(null)

// on clicking sign up and login
  const onclickSignup = () => {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
  }
  const onclickLogin = () => {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    loginForm.style.marginLeft = "0";
    loginText.style.marginLeft = "0";
  }

 //this function will run after the sign in is completed through google, and it will send the data of user
 const {setDetails,Details}=useContext(AccountContext)
 let history = useNavigate();
 
  const onSuccess = async (responseOfUser) => {
    
    const decodedInformationOfUser_byJwt = jwtDecode(responseOfUser.credential);
    Object.assign(decodedInformationOfUser_byJwt, { byGoogle: true });
    setDetails(decodedInformationOfUser_byJwt);
    console.log(decodedInformationOfUser_byJwt)
   await createUser(decodedInformationOfUser_byJwt);
   history('/');
  }
  const onError = (res) => {
    console.log("login failed", res);
  }


  return (

    <div className='new'  style={{
      "height": "100vh",
      'width': "100vw",
      display:"flex",
alignItems:"center",
justifyContent:"center",
      // "backgroundColor": "#DCDCDC"
      backgroundImage: `url(${bg1})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition:"center"
    }}>
      {/*     background-color: #f0f2f5; */}
      {/* <NavBar>
        <Toolbar>

        </Toolbar>
      </NavBar> */}


      {/* here we want to change the style of the paper component of our element ,there are different props for different component */}


          <Animated 
          isVisible={true}
          animationIn='slideInUp'
          animationInDuration={1000}
          >
            <BoxMain id='new'>
            <Box1><img src={logo} alt="logo" />
            <Box2>Let's get started with Chat Hub</Box2></Box1>
        <div className="wrapper" >
          <div className="form-container">
            <div className="slide-controls"><input id="login" type="radio" name="slide" checked="" /><input id="signup"
              type="radio" name="slide" />
              <label onClick={onclickLogin} className="slide login" htmlFor="login">Login</label>
              <label onClick={onclickSignup} className="slide signup" htmlFor="signup">Signup</label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form className="login" action="/login" method="post" style={{ "marginLeft": "0%" }}>
                <div className="field"><input type="email" name="email" placeholder="Email Address" required="" /></div>
                {/* <div className="field"><input type="password" name="password" placeholder="Password" required="" /></div> */}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
                <div className="pass-link"><a href="/">Forgot password?</a></div>
                {/* <div className="field btn">
                  <div className="btn-layer"></div><input type="submit" value="Login" onClick={() => { }} />
                </div> */}
                					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">
							<span>Login</span>	
							</button>
						</div>
					</div>
                <div className="signup-link">
                  Not a member?<a ref={ref} onClick={onclickSignup}>Signup now</a>
                </div>
                <div className="googlebox">
                  <span>or</span>
                </div>
                <div style={{
                  "display": "flex",
                  "justifyContent": "center",
                  "marginBottom": "8px"
                }}>
{/* logging in with google */}
{                !Details &&  <GoogleLogin

                    onSuccess={onSuccess}
                    onError={onError}
                    
                    />}
                </div>
              </form>
              <form className="signup" action="/register" method="post">
                <div className="field"><input type="text" name="name" placeholder="Name" required="" /></div>
                <div className="field"><input type="email" name="email" placeholder="Email Address" required="" /></div>
                <div className="field"><input type="password" name="password" placeholder="Password" required="" /></div>
                <div className="field"><input type="password" name="cpassword" placeholder="Confirm password"
                  required="" /></div>
                <div className="field btn">
                  <div className="btn-layer"></div><input type="submit" value="Signup" />
                </div>
              </form>
            </div>
          </div>
        </div>


      </BoxMain>
                  </Animated>
    </div>
  )
}
// #2961ff button bg
// #00ffdc not a member
// forgot password make a little blue
//  25px border radius
// background-color: rgba(0, 0, 0, 0.3);
export default Login