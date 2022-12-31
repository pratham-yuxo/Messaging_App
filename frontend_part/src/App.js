import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import LoginBox from "./components/LoginBox";
// import AccountState from './context/contextForLoginDetails/AccountState';
import AccountState from './context/contextForLoginDetails/AccountState';
// import Home from './components/Home';
// import { useContext } from 'react';
import ForSwitchingLoginTo from './components/ForSwitchingLoginTo';

const App = () => {
  const myClientId = '564825539242-j72it37t2cd9me8nb3ir8uglu1pfetbb.apps.googleusercontent.com';
  // const {Details}= useContext(AccountContext)
  return (
    <>
      <GoogleOAuthProvider clientId={myClientId}>
        {/* account state is a context for managing details after login */}
        <AccountState>

          <ForSwitchingLoginTo />
        </AccountState>

      </GoogleOAuthProvider>
    </>
  )
}

export default App;
