import { Request, Response } from 'express';
import axios from "axios";
import dotenv from "dotenv";
import db from '../config/connection';

const User = db.models.User;

dotenv.config();
// Environment Variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_API_URL) {
  throw new Error("Environment variables TELEGRAM_BOT_TOKEN and TELEGRAM_API_URL must be defined");
}

const otpStore: Record<string, string> = {};

const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();


export const initializeUsername = async (req: Request, res: Response) => {
  try {
    const { telegramUsername } = req.body;

    if (!telegramUsername) {
      return res.status(400).json({
        status: false,
        error: "A valid Telegram username is required.",
      });
    }
    const existingUser = await User.findOne({
      where: { username: telegramUsername, social: "TELEGRAM" },
    });

    const response = await axios.get(
      `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
    );

    if (!response.data.ok) {
      throw new Error(response.data.description || "Failed to fetch updates from Telegram.");
    }

    const updates = response.data.result;

    // Check for a user interaction with the bot
    const userUpdate = updates.find(
      (update: any) => update.message && update.message.from.username === telegramUsername
    );

    if (!userUpdate) {
      return res.status(404).json({
        status: false,
        error: "No interaction found with the provided Telegram username.",
      });
    }

    console.log(userUpdate.message)
    const chatId = userUpdate.message.chat.id;
    // Create a new user record
    if (!existingUser) {
      const newUser = await User.create({
        username: telegramUsername,
        social: "TELEGRAM",
        firstname: userUpdate.message.from.first_name || null,
        lastname: userUpdate.message.from.last_name || null,
        telegramChatId: chatId,
        email: userUpdate.message.from.email || null,
        phoneNumber: userUpdate.message.from.phone_number || null
      });
    }

    return res.status(201).json({
      status: true,
      data: { chatId },
      message: "User created and chat information retrieved successfully.",
    });
  } catch (error: any) {
    console.error("Error initializing username:", error.message);
    return res.status(500).json({
      status: false,
      error:
        error.response?.data?.description ||
        "Failed to initialize user. Ensure the Telegram username is correct and the user has interacted with the bot.",
    });
  }
};

// Endpoint to send OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        error: "Valid userId required",
      });
    }
    console.log('User Id', userId)
    const chatId = userId;

    const otp = generateOtp();
    otpStore[userId] = otp; 

    const sendMessageUrl = `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await axios.post(
      sendMessageUrl,
      {
        chat_id: chatId,
        text: `Your OneStep OTP is: ${otp}. This code will expire in 10 minutes.`,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json({
      status: true,
      data: telegramResponse.data,
      message: "OTP sent successfully!",
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error.response ? error.response.data : error.message);
    return res.status(500).json({
      status: false,
      error: error.response?.data?.description || "Failed to send OTP. Ensure the Telegram username is correct.",
    });
  }
};

// Endpoint to verify OTP
export const verifyOtp = (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const storedOtp = otpStore[userId];

  if (storedOtp && storedOtp === otp) {
    delete otpStore[userId]; // Clear OTP after successful verification
    return res.status(200).json({ username: `User-${userId}`, message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ error: "Invalid OTP or OTP has expired" });
  }
};