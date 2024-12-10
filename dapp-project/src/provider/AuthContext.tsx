import React, { createContext, useState, useContext } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (username: string, passcode: string) => void;
  logout: () => void;
  register: (userData: Omit<User, 'osId'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, passcode: string) => {
    // Implement login logic
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData: Omit<User, 'osId'>) => {
    // Implement registration logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};