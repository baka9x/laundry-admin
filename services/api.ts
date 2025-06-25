import axios from "axios";
import { BACKEND_URL } from "@/config/variables";
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== 'undefined') {
  const token = Cookies.get("token") || localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}