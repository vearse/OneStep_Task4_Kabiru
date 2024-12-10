import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { AuthMethod } from '../../types/AuthMethod';

interface IHandleResponse {
  status: boolean;
  data: object;
  message: string;
}

const TelegramAuth: React.FC = () => {
  const [step, setStep] = useState<'identifier' | 'otp'>('otp',);
  const [identifier, setIdentifier] = useState('');
  const [telegramUserId, setTelegramUserId] = useState('');
  const [otp, setOtp] = useState('');

  const handleIdentifierSubmit = async () => {
    try {
      const response:any = await AuthService.initiateAuthByUsername(identifier);
      if (response.status) {
        setTelegramUserId(response.data.chatId);
        console.log(telegramUserId, response.data.chatId);
        await AuthService.initiateAuth(AuthMethod.TELEGRAM, telegramUserId);
        setStep('otp');
      }
    } catch (error) {
      console.error('OTP Sending Failed', error);
    }
  };

  const handleOTPVerification = async () => {
    const isVerified = await AuthService.verifyAuth(AuthMethod.TELEGRAM, telegramUserId, otp);
    if (isVerified) {
      // Proceed to next registration/login step
    }
  };

  return (
    <div className="flex flex-col justify-center h-[600px] w-[600px] bg-gray-100 shadow rounded">
      <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        One<span className="text-gray-900">Step</span>
      </h1>
      <div className='flex justify-center items-center h-[85%]'>
          {step === 'identifier' && (
            <div className="flex flex-col">
              <h2 className="pb-2 font-semibold tracking-tight text-black text-4xl dark:text-white">Login</h2>
              <p className="mb-10 text-md font-normal text-gray-500 ">Input your telegram detail below to login</p>
              <div className="p-6   w-full">
                <input
                  type="text"
                  placeholder="Phone Number or Username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleIdentifierSubmit}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
              <div className="flex flex-col">
                <h2 className="pb-2 font-semibold tracking-tight text-black text-4xl dark:text-white">OTP Verification</h2>
                <p className="mb-10 text-md font-normal text-gray-500 ">Input the OTP sent to you</p>
                  <div className="p-6   w-full">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleOTPVerification}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Verify OTP
                    </button>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default TelegramAuth;
