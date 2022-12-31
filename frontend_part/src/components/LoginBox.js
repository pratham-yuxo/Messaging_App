// for now accountContext exports all of my context 
import React, { useRef,useContext,useEffect } from 'react';
import { Dialog } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
// import { Link } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import AccountContext from '../context/accountContext';
//importing valuse from accountstate 
import {Animated} from "react-animated-css";
import { createUser } from '../allApis/forAdding';

const NavBar = styled(AppBar)`
height:180px;
background-image: linear-gradient(#a00abb,#6621a4);
`


const Login = () => {



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
 const {setDetails}=useContext(AccountContext)
  const onSuccess = async (responseOfUser) => {
    const decodedInformationOfUser_byJwt = jwtDecode(responseOfUser.credential);
    setDetails(decodedInformationOfUser_byJwt);
   await createUser(decodedInformationOfUser_byJwt);
  }
  const onError = (res) => {
    console.log("login failed", res);
  }


  return (

    <div  style={{
      "height": "100vh",
      'width': "100vw",
      "backgroundColor": "#DCDCDC"
      
    }}>
      {/*     background-color: #f0f2f5; */}
      <NavBar>
        <Toolbar>

        </Toolbar>
      </NavBar>


      {/* here we want to change the style of the paper component of our element ,there are different props for different component */}


      <Dialog  hideBackdrop={true} open={true}>
          <Animated 
          isVisible={true}
          animationIn='slideInUp'
          animationInDuration={1000}
          >
        <div className="wrapper" >
          <div className="title-text">
            <div className="title login" style={{ "marginLeft": "0%" }}>
              Login </div>
            <div className="title signup">
              Signup</div>
          </div>
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
                <div className="field"><input type="password" name="password" placeholder="Password" required="" /></div>
                <div className="pass-link"><a href="/">Forgot password?</a></div>
                <div className="field btn">
                  <div className="btn-layer"></div><input type="submit" value="Login" onClick={() => { }} />
                </div>
                <div className="signup-link">
                  Not a member?<a href='/' ref={ref} onClick={onclickSignup}>Signup now</a>
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
                  <GoogleLogin

                    onSuccess={onSuccess}
                    onError={onError}
                    
                    />
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


                  </Animated>
      </Dialog>
    </div>
  )
}

export default Login