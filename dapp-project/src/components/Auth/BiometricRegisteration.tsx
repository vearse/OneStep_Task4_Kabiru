import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface LoginProps {
  onLogin: (credentials: {
    username: string;
    passcode: string;
    biometricData?: File;
  }) => void;
}

const BiometricRegisteration: React.FC<LoginProps> = ({ onLogin }) => {
  const [passcode, setPasscode] = useState('');
  const [biometricFile, setBiometricFile] = useState<File | null>(null);
  const [loginMethod, setLoginMethod] = useState<'passcode' | 'biometric'>(
    'passcode'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      username,
      passcode,
      biometricData: biometricFile || undefined,
    });
  };

  return (
    <div className="flex flex-col justify-center h-[650px] w-[600px] bg-gray-100 shadow rounded">
      <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        One<span className="text-gray-900">Step</span>
      </h1>

      <div className='flex flex-col justify-center items-center h-[85%] w-full'>
        <h2 className="pb-2 font-semibold tracking-tight text-black text-4xl dark:text-white">
            Biometric
        </h2>

        <div className="flex justify-center mb-3 space-x-2">
          <Button
            variant={loginMethod === 'passcode' ? 'primary' : 'secondary'}
            onClick={() => setLoginMethod('passcode')}
          >
            Passcode
          </Button>
          <Button
            variant={loginMethod === 'biometric' ? 'primary' : 'secondary'}
            onClick={() => setLoginMethod('biometric')}
          >
            Biometric
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="w-[450px] ">
            {loginMethod === 'passcode' && (
              <Input
                type="password"
                placeholder="Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            )}

            {loginMethod === 'biometric' && (
              <Input
                type="file"
                placeholder="Upload Biometric Data"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) setBiometricFile(files[0]);
                }}
                required
              />
            )}
          </div>

          <Button type="submit" className="w-full py-2">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BiometricRegisteration;