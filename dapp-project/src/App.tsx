import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './provider/AuthContext';
import Registration from './components/Auth/Registration';
import BiometricRegisteration from './components/Auth/BiometricRegisteration';
import DeviceManagement from './components/Auth/DeviceManagement';
import TelegramAuth from './components/Auth/TelegramAuth';

import Profile from './components/Account/Profile';
import PasscodeSetup from './components/Forms/PasscodeSetup';
import './index.css';
import './App.css';
import TokenBalance from './components/Account/TokenBalance';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Onboardig */}
          <Route path="/telegram-auth" element={<TelegramAuth />} />
          <Route path="/setup" element={<Registration onRegister={() => {}} />} />
          <Route path="/biometric" element={<BiometricRegisteration onLogin={() => {}} />} />
          <Route path="/passcode-setup" element={<PasscodeSetup onPasscodeSet={() => {}} />} />
         
           {/* Account  */}
          <Route path="/profile" element={<Profile onRegister={() => {}} />} />
          <Route path="/balance" element={<TokenBalance />} />
          <Route path="/devices" element={<DeviceManagement 
            devices={[]} 
            onRemoveDevice={() => {}} 
          />} />

          {/* Redirect to Telegram Auth if no other route matches */}
          <Route path="/" element={<Navigate to="/telegram-auth" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;