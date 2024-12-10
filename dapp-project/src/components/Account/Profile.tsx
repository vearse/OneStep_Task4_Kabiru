import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { User } from '../../types/User';

interface ProfileProps {
  onRegister: (userData: Omit<User, 'osId'>) => void;
}

const Profile: React.FC<ProfileProps> = ({ onRegister }) => {
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
  };

  return (
    <div className="flex justify-between gap-20 bg-gray-100">
      <div className="flex flex-col flex-start bg-white border-gray-100  rounded min-w-[500px]" style={{ alignItems: 'flex-start'}}>
          <h2 className="pb-2 font-semibold tracking-tight text-black text-2xl dark:text-white">Profile</h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-[90%] space-y-6" >
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
      <div className="w-[300px] p-4">
          <h1 className="text-4xl mb-10 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  One<span className="text-gray-900">Step</span>
          </h1>
          <p className='text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ex hic quidem quod, perspiciatis recusandae deserunt inventore. Non facilis quibusdam, commodi velit molestiae nihil nam, possimus assumenda at voluptate recusandae.</p>
      </div>
    </div>
  );
};

export default Profile