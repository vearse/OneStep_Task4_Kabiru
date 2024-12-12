import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';

interface RegistrationProps {
  onRegister: (userData: Omit<User, 'osId'>) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({
      username,
      phoneNumber,
      dateOfBirth,
      referralCode,
    });
    navigate('/passcode-setup');
  };

  return (
    <div className="flex flex-col justify-center h-[650px] w-[600px] bg-gray-100 shadow rounded">
        <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          One<span className="text-gray-900">Step</span>
        </h1>

        <div className='flex flex-col justify-center items-center h-[85%]'>
          <h2 className="pb-2 font-semibold tracking-tight text-black text-4xl dark:text-white">Setup Account</h2>
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
            <hr />
            <Input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <Button type="submit" className="w-1/2 py-2">
              Procees
            </Button>
          </form>
        </div>

    </div>
  );
};

export default Registration