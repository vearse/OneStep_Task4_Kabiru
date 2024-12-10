import express from 'express';
import { Request, Response } from 'express';
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

// Environment Variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_API_URL) {
  throw new Error("Environment variables TELEGRAM_BOT_TOKEN and TELEGRAM_API_URL must be defined");
}

// OTP Store (use Redis/DB in production)
const otpStore: Record<string, string> = {};

// Generate a random 6-digit OTP
const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

// Endpoint to send OTP
const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, telegramUsername } = req.body;

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber) || !telegramUsername) {
      return res.status(400).json({
        status: false,
        error: "Valid phone number and Telegram username required",
      });
    }

    // console.log(`Requesting chat info for @${telegramUsername}`);
    // const userInfoResponse = await axios.get(
    //   `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_TOKEN}/getChat`,
    //   {
    //     params: { chat_id: `@${telegramUsername}` },
    //   }
    // );

    // if (!userInfoResponse.data.ok) {
    //   throw new Error(userInfoResponse.data.description || "Failed to fetch chat info");
    // }

    const chatId = telegramUsername;//userInfoResponse.data.result.id;

    const otp = generateOtp();
    otpStore[phoneNumber] = otp;

    const sendMessageUrl = `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    console.log('Sending OTP to Telegram:', sendMessageUrl, otp);

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
const verifyOtp = (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const storedOtp = otpStore[phoneNumber];

  if (storedOtp && storedOtp === otp) {
    delete otpStore[phoneNumber]; // Clear OTP after successful verification
    return res.status(200).json({ username: `User-${phoneNumber}`, message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ error: "Invalid OTP or OTP has expired" });
  }
};

// Route handlers
app.post("/api/telegram/send-otp", sendOtp);
app.post("/api/telegram/verify-otp", verifyOtp);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
});