import axios from 'axios';
import Cookies from 'js-cookie';
export const authAxios = axios.create();

if (typeof window !== 'undefined') {
  const token = Cookies.get("token") || localStorage.getItem('token');
  if (token) {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export async function authGet(url: string) {
  return authAxios.get(url);
}