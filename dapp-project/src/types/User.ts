import { Device } from "./Device";

export interface User {
    osId: string;
    username: string;
    phoneNumber: string;
    dateOfBirth: Date;
    referralCode?: string;
    devices?: Device[];
}
  