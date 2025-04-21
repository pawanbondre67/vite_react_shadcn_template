import axios from '@/api/axios';
import { User } from '@/types';
import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser : React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('auth/login', {
        email,
        password,
      });

      if (response.data) {
        console.log('user data' , JSON.stringify(response));
         const userData = {
          ...response.data.user,
          accessToken: response.data.accessToken,
         };
        setUser(userData);
        navigate(from, { replace: true });
        toast.success('Login successful!');
      }
    } catch (error: any) {
      if (error) {
        if (error.response?.status === 401) {
          console.error('Invalid credentials');
          toast.error('Invalid credentials');
        } else {
          console.error('Login error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
     await axios.post('auth/register', {
        email,
        password,
      });

      // Auto-login after signup
      await login(email, password);
    } catch (error) {
      console.error('Sign up failed:', error);
    
    }
  };

  const logout = async() => { 

    const res = await axios.post('auth/logout')
    console.log(res.data);
    console.log('user', user);
    setUser(null);  
    navigate('/login', { replace: true });

  };

  return (
    <AuthContext.Provider
      value={{ user, login, setUser, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
