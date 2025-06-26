import { LoginCredentials, User } from '@/types/user';
import {api} from './api'
import { getServerToken, serverApi } from './serverApi';

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
}

export const getUserProfile = async (isServer = false): Promise<User> => {
  if (isServer) {
    await getServerToken();
    const res = await serverApi.get('/auth/users/me');
    return res.data;
  } else {
    const res = await api.get('/auth/users/me');
    return res.data;
  }
};