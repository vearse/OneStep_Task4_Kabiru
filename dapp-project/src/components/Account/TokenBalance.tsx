import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from '../utils/MyTokenABI.json';

const TokenBalance: React.FC = () => {
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchTokenBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const myToken = new ethers.Contract(
        '0x...', // Replace with the deployed contract address
        MyTokenABI,
        signer
      );
      const balance = await myToken.balanceOf(await signer.getAddress());
      setBalance(ethers.utils.formatEther(balance));
    };
    fetchTokenBalance();
  }, []);

  return (
    <div className="flex justify-between gap-20 h-[500px] bg-gray-100">
      <div className="flex flex-col flex-start bg-white border-gray-100  rounded min-w-[500px]" style={{ alignItems: 'flex-start'}}>
        <h2 className="pb-2 font-semibold tracking-tight text-black text-2xl dark:text-white">
            MyToken Balance:
        </h2>
        <p>{balance} MyToken</p>
      </div>

      <div className="w-[300px] p-4">
          <h1 className="text-4xl mb-10 font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  One<span className="text-gray-900">Step</span>
          </h1>
          <p className='text-left'>.</p>
      </div>
    </div>
  );
};

export default TokenBalance;