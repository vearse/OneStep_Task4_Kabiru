
import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface ReferralCodeInputProps {
  onReferralCodeSubmit: (code: string) => void;
}

const ReferralCodeInput: React.FC<ReferralCodeInputProps> = ({ onReferralCodeSubmit }) => {
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReferralCodeSubmit(referralCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter Referral Code (Optional)"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <Button type="submit" variant="secondary">
        Apply Referral Code
      </Button>
    </form>
  );
};

export default ReferralCodeInput;
