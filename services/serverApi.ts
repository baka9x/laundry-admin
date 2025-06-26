'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/config/variables';

export const serverApi = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getServerToken() {
  const token = (await cookies()).get('token')?.value;
  if (token) {
    serverApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
