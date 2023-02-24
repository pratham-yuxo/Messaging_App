// for now accountContext exports all of my context 
import React, { useRef, useContext, useState, useEffect } from 'react';
// material ui
import { styled, Box } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
// import { Link } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import AccountContext from '../context/accountContext';
//importing valuse from accountstate 
import { Animated } from "react-animated-css";
import { createUser, login } from '../allApis/forAdding';
// images
import logo from "../images/newLogo.png";
import { useNavigate } from 'react-router-dom'
import bg1 from '../images/bg4.png';
import { FormControl, IconButton, InputAdornment, InputLabel, Input } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Box1 = styled(Box)`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
& > img{
  height:70px;
  margin: 25px;
}
`
const Box2 = styled(Box)`
font-weight:600;
    font-size: 34px;
    font-size: 23px;
font-family: 'Libre Baskerville';
// font-family: 'Inspiration';
color:black;
margin-bottom:10px;

`
const BoxMain = styled(Box)`
height: 87vh;
    overflow: scroll;
    overflow-x: hidden;
    // background-color: rgba(0, 0, 0, 0.2);
    // background-color:white;
    background: rgb(255 255 255 / 90%);
    border-radius:10px;
`

const Login = () => {
  useEffect(() => {

    let a = localStorage.getItem('token');
    console.log(a)
  }, [])

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

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
  const { setDetails, Details } = useContext(AccountContext)
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
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  const SignupSchema2 = Yup.object().shape({
    password2: Yup.string()
      .min(5, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    email2: Yup.string().email('Invalid email').required('Required'),
  });


  return (

    <div className='new' style={{
      "height": "100vh",
      'width': "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // "backgroundColor": "#DCDCDC"
      backgroundImage: `url(${bg1})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
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
                <Formik
                  initialValues={{ email2: '', password2: '' }}
                  validationSchema={SignupSchema2}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values, "formik");
                    const handleLogin = async () => {
                      await login(values);
                      history('/')
                    }
                    handleLogin();
                    setSubmitting(false);
                  }
                  }
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                  }) => (
                    <form className="login" onSubmit={(e) => { handleSubmit(); e.preventDefault(); }} style={{ "marginLeft": "0%" }}>
                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">E-mail</InputLabel>
                        <Field type="email" name="email" id="email2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email2}
                          component={Input} />
                      </FormControl>

                      {touched.email2 && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="email" component="div" />}

                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Field
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password2}
                          name="password" id="password2" type={showPassword ? 'text' : 'password'} component={Input}
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
                      {touched.password2 && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="password" component="div" />}
                      {/* <div className="pass-link"><a href="/">Forgot password?</a></div> */}
                      <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                          <div className="login100-form-bgbtn"></div>
                          <button type="submit" className="login100-form-btn" disabled={isSubmitting}>
                            <span>Login</span>
                          </button>
                        </div>
                      </div>
                      <div className="signup-link">
                        Not a member?<a style={{color:"black",fontSize:"13px"}} href='/' ref={ref} onClick={onclickSignup}>Signup now</a>
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
                        {!Details && <GoogleLogin
                          onSuccess={onSuccess}
                          onError={onError}
                        />}
                      </div>
                    </form>
                  )}
                </Formik>

                {/* *******************Sign UP area   ************************* */}

                <Formik
                  initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    const add = async () => {
                      Object.assign(values, { byGoogle: false });
                      console.log(values, "formik");
                      await createUser(values);
                      history('/');

                    }
                    add();
                    setSubmitting(false);
                  }
                  }
                >

                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                  }) => (
                    <form onSubmit={(e) => { handleSubmit(); e.preventDefault(); }} className="signup">
                      {/* ***************      NAME          */}
                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                        <Field type="name" name="name" id="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          component={Input} />
                      </FormControl>

                      {touched.name && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="email" component="div" />}
                      {/* ***************      E mail          */}
                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">E-mail</InputLabel>
                        <Field type="email" name="email" id="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          component={Input} />
                      </FormControl>

                      {touched.email && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="email" component="div" />}


                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Field validate={(value) => value.length < 5 && 'Password must be atleast 5 characters long'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          name="password" id="password" type={showPassword ? 'text' : 'password'} component={Input}
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
                      {touched.password && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="password" component="div" />}

                      {/* *********   confirm password */}
                      <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Field
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
                          name="confirmPassword" id="confirmPassword" type={showCPassword ? 'text' : 'password'}
                          component={Input}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showCPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      {touched.confirmPassword && <ErrorMessage style={{
                        marginLeft: "9px",
                        color: "red",
                        fontSize: "12px"
                      }} name="confirmPassword" component="div" />}
                      <div className="field btn">
                        <div className="btn-layer"></div><input type="submit" value="Signup" />
                      </div>
                    </form>)}

                </Formik >
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