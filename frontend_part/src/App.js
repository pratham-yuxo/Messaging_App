import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import LoginBox from "./components/LoginBox";
// import AccountState from './context/contextForLoginDetails/AccountState';
import AccountState from './context/contextForLoginDetails/AccountState';
// import Home from './components/Home';
// import { useContext } from 'react';
import ForSwitchingLoginTo from './components/ForSwitchingLoginTo';
import LoginBox from "./components/LoginBox"
import Home from './components/Home';
const App = () => {
  const myClientId = '564825539242-j72it37t2cd9me8nb3ir8uglu1pfetbb.apps.googleusercontent.com';
  // const {Details}= useContext(AccountContext)
  return (
    <>
        {/* account state is a context for managing details after login */}
        <AccountState>
          <BrowserRouter>
          
          <Routes>
            {/* route 1 home */}
            <Route exact path="/" element={<Home/>}></Route>
      
            <Route exact path='/login' element={
            <GoogleOAuthProvider clientId={myClientId}>
            <LoginBox/>
            </GoogleOAuthProvider>}></Route>
      
          </Routes>
          </BrowserRouter>
          {/* <ForSwitchingLoginTo /> */}
        </AccountState>

    </>
  )
}

export default App;
