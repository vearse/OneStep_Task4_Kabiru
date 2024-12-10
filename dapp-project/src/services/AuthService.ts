
import { User } from '../types/User';
import { Device } from '../types/Device';
import { AuthMethod } from '../types/AuthMethod';
import { TelegramService } from './TelegramService';

export class AuthService {
  private static users: User[] = [];
  private static currentUser: User | null = null;

  static async initiateAuthByUsername(username: string) {
    return await  TelegramService.innitializeTelegramAuth(username);
  }


  static async initiateAuth(method: AuthMethod, identifier: string) {
    switch(method) {
      case AuthMethod.TELEGRAM:
        return await TelegramService.sendOTP(identifier);
      default:
        throw new Error('Unsupported authentication method');
    }
  }

  static async verifyAuth(method: AuthMethod, identifier: string, otp: string) {
    switch(method) {
      case AuthMethod.TELEGRAM:
        return await TelegramService.verifyOTP(identifier, otp);
      default:
        throw new Error('Unsupported authentication method');
    }
  }

  static validatePasscode(passcode: string, userDetails: {dob: string}): boolean {
    // Complex passcode validation
    const isNotSimple = !this.isCommonPattern(passcode);
    const notRelatedToDOB = !this.isRelatedToDOB(passcode, userDetails.dob);
    return isNotSimple && notRelatedToDOB;
  }

  private static isCommonPattern(passcode: string): boolean {
    const commonPatterns = [
      '123456', '654321', '111111', '000000',
      'abcdef', 'qwerty'
    ];
    return commonPatterns.includes(passcode);
  }

  private static isRelatedToDOB(passcode: string, dob: string): boolean {
    // Remove non-numeric characters from DOB
    const dobNumeric = dob.replace(/\D/g, '');
    return dobNumeric.includes(passcode);
  }

  static register(userData: Omit<User, 'osId'>): User {
    const newUser: User = {
      osId: this.generateOsId(),
      ...userData,
      devices: []
    };
    this.users.push(newUser);
    return newUser;
  }

  static login(username: string, passcode: string): User | null {
    const user = this.users.find(u => u.username === username);
    // In a real app, you'd verify passcode securely
    return user || null;
  }

  static addDevice(user: User, deviceName: string): Device {
    const newDevice: Device = {
      id: this.generateDeviceId(),
      name: deviceName,
      lastLogin: new Date()
    };
    user.devices = user.devices || [];
    user.devices.push(newDevice);
    return newDevice;
  }

  static removeDevice(user: User, deviceId: string): void {
    user.devices = user.devices?.filter(device => device.id !== deviceId);
  }

  private static generateOsId(): string {
    return 'OS-' + Math.random().toString(36).substr(2, 9);
  }

  private static generateDeviceId(): string {
    return 'DEV-' + Math.random().toString(36).substr(2, 9);
  }
}