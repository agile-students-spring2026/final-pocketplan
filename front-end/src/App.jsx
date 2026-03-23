import React, { useState } from 'react';
import './auth.css';
import SignUpEmail from './components/SignUpEmail';
import LoginScreen from './components/LoginScreen';
import SignUpPassword from './components/SignUpPassword';
import ForgotPassword from './components/ForgotPassword';

const SCREENS = {
  SIGNUP_EMAIL: 'signup-email',
  LOGIN: 'login',
  SIGNUP_PASSWORD: 'signup-password',
  FORGOT: 'forgot',
};

function App() {
  const [screen, setScreen] = useState(SCREENS.SIGNUP_EMAIL);

  return (
    <div className="auth-page">
      {screen === SCREENS.SIGNUP_EMAIL && (
        <SignUpEmail
          onNext={() => setScreen(SCREENS.SIGNUP_PASSWORD)}
          onGoLogin={() => setScreen(SCREENS.LOGIN)}
        />
      )}
      {screen === SCREENS.LOGIN && (
        <LoginScreen
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onLogin={() => {}}
          onForgotPassword={() => setScreen(SCREENS.FORGOT)}
        />
      )}
      {screen === SCREENS.SIGNUP_PASSWORD && (
        <SignUpPassword
          onBack={() => setScreen(SCREENS.SIGNUP_EMAIL)}
          onNext={() => setScreen(SCREENS.LOGIN)}
        />
      )}
      {screen === SCREENS.FORGOT && (
        <ForgotPassword onBack={() => setScreen(SCREENS.LOGIN)} />
      )}
    </div>
  );
}

export default App;
