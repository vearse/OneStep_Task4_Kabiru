import React, { useState } from "react";
import axios from "axios";

const TelegramLogin: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const requestOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/telegram/send-otp", { phoneNumber });
      console.log(response)
      alert(response.data.message); // For simplicity, show success message.
      setStep("otp");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Please try again.");
    }
  }; 
 
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/telegram/verify-otp", { phoneNumber, otp });
      alert(`Welcome ${response.data.username}!`);
    } catch (error) {
      console.error(error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Telegram Social Login</h1>

      {step === "phone" && (
        <div>
          <label className="block mb-2">Enter your phone number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., +123456789"
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={requestOtp}
            className="bg-blue-500 text-white p-2 w-full rounded"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "otp" && (
        <div>
          <label className="block mb-2">Enter the OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="e.g., 123456"
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-500 text-white p-2 w-full rounded"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default TelegramLogin;
