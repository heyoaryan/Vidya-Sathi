import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'counsellor' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Rehydrate user from localStorage on first load
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vs_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch (err) {
      // ignore storage errors
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email === 'counsellor@vidhyarti.com' && password === 'counsellor123') {
      const u: User = {
        id: '1',
        name: 'Counsellor User',
        email: 'counsellor@vidhyarti.com',
        role: 'counsellor'
      };
      setUser(u);
      localStorage.setItem('vs_auth_user', JSON.stringify(u));
      return true;
    } else if (email === 'teacher@vidhyarti.com' && password === 'teacher123') {
      const u: User = {
        id: '2',
        name: 'Teacher User',
        email: 'teacher@vidhyarti.com',
        role: 'teacher'
      };
      setUser(u);
      localStorage.setItem('vs_auth_user', JSON.stringify(u));
      return true;
    } else if (email === 'student@vidhyarti.com' && password === 'student123') {
      const u: User = {
        id: '4',
        name: 'Student User',
        email: 'student@vidhyarti.com',
        role: 'student'
      };
      setUser(u);
      localStorage.setItem('vs_auth_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('vs_auth_user'); } catch {}
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isInitializing
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
