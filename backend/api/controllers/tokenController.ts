import { Request, Response } from 'express';
import { ethers } from 'ethers';
import MyTokenABI from '../utils/MyTokenABI.json';

export const getTokenBalance = async (req: Request, res: Response) => {
try {
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const myToken = new ethers.Contract('0x123456789abcdef123456789abcdef123456789a', MyTokenABI, provider); 
    const balance = await myToken.balanceOf('0x123456789abcdef123456789abcdef123456789a');
    return res.status(200).json({
        status: true,
        balance: ethers.formatEther(balance),
    });
} catch (error) {
    return res.status(500).json({
        status: false,
        error: 'Error fetching token balance',
    });
}
};