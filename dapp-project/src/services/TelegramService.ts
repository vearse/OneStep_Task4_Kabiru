import axios from "axios";

interface TelegramUser {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
}

export class TelegramService {

  static innitializeTelegramAuth(telegramUsername: string):  Promise<string> {
    return axios
      .post("http://localhost:4000/api/telegram/authenticate", { telegramUsername })
      .then(response => response.data);
  }
  
  static sendOTP(userId: string): Promise<string> {
    return axios
      .post("http://localhost:4000/api/telegram/send-otp", { userId })
      .then(response => response.data);
  }

  static verifyOTP(userId: string, otp: string): Promise<boolean> {
    return axios
      .post("http://localhost:4000/api/telegram/verify-otp", { userId, otp })
      .then(response => response.data);
  }
}
