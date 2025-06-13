import React, { createContext, useState, ReactNode } from 'react';

export interface LoginLogEntry {
  username: string;
  role: string;
  time: string;
  status: 'success' | 'fail';
}

interface LoginLogContextType {
  logs: LoginLogEntry[];
  addLog: (entry: LoginLogEntry) => void;
}

export const LoginLogContext = createContext<LoginLogContextType>({
  logs: [],
  addLog: () => {},
});

export const LoginLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LoginLogEntry[]>([]);

  const addLog = (entry: LoginLogEntry) => {
    setLogs((prev) => [entry, ...prev]);
  };

  return (
    <LoginLogContext.Provider value={{ logs, addLog }}>
      {children}
    </LoginLogContext.Provider>
  );
};
