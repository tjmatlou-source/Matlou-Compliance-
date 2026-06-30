import api from './api';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'BORROWER' | 'LENDER' | 'ADMIN';
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (email: string, password_hash: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password_hash });
    return response.data;
  },

  register: async (email: string, password_hash: string, role: string): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', { email, password_hash, role });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/profile/me');
    return response.data;
  }
};
