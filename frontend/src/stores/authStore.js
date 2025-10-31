import { create } from 'zustand';
import { authApi } from '../lib/api';
import { toast } from 'react-toastify';

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authApi.signup(data);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      toast.success('Account created successfully!');
      get().authCheck();
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || 'Signup failed');
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authApi.login(data);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
      toast.success('Logged in successfully!');
      get().authCheck();
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      set({ authUser: null, user: null, isAuthenticated: false });
      toast.info('Logged out successfully');
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error.response);
    }
  },
  authUser: null,
  isCheckingAuth: true,
  authCheck: async () => {
    try {
      const response = await authApi.authCheck();
      set({ authUser: response.data });
    } catch (error) {
      console.log(error.response.message);
    } finally {
      set({ isCheckingAuth: false });
    }

  },
}));