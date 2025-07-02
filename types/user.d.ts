export interface User {
    id: number;
    username: string;
    role: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
  token: string;
  user_id: string;
}

export interface UsersResponse {
  data: User[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}