import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface PasscodeSetupProps {
  onPasscodeSet: (passcode: string) => void;
}

const PasscodeSetup: React.FC<PasscodeSetupProps> = ({ onPasscodeSet }) => {
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode !== confirmPasscode) {
      setError('Passcodes do not match');
      return;
    }
    if (passcode.length < 6) {
      setError('Passcode must be at least 6 characters');
      return;
    }
    onPasscodeSet(passcode);
  };

  return (
    <div className="flex flex-col justify-center h-[650px] w-[600px] bg-gray-100 shadow rounded">
      <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        One<span className="text-gray-900">Step</span>
      </h1>

      <div className='flex flex-col justify-center items-center h-[85%]'>
        <h2 className="pb-2 font-semibold tracking-tight text-black text-4xl dark:text-white">Set Up Passcode</h2>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            type="password"
            placeholder="Create Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Passcode"
            value={confirmPasscode}
            onChange={(e) => setConfirmPasscode(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Set Passcode
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasscodeSetup;