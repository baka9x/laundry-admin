import { LoginCredentials, User } from '@/types/user';
import {api} from './api'


export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
}

export const getUserProfile = async (token: string): Promise<User> => {
  const response = await api.get('/auth/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
