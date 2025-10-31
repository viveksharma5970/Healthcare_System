import { create } from 'zustand';
import { doctorApi } from '../lib/api';
import { toast } from 'react-toastify';

export const useDoctorStore = create((set) => ({
  doctors: [],
  isLoading: false,
  selectedDoctor: null,

  fetchDoctors: async () => {
    set({ isLoading: true });
    try {
      const response = await doctorApi.getAll();
      set({ doctors: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch doctors');
      } else {
        set({ doctors: [] });
      }
    }
  },

  fetchDoctorById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await doctorApi.getById(id);
      set({ selectedDoctor: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch doctor details');
    }
  },

  createDoctor: async (data) => {
    set({ isLoading: true });
    try {
      const response = await doctorApi.create(data);
      set((state) => ({
        doctors: [...state.doctors, response.data],
        isLoading: false,
      }));
      toast.success('Doctor added successfully!');
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to add doctor');
      throw error;
    }
  },

  updateDoctor: async (id, data) => {
    set({ isLoading: true });
    try {
      await doctorApi.update(id, data);
      set((state) => ({
        doctors: state.doctors.map((doc) =>
          doc._id === id ? { ...doc, ...data } : doc
        ),
        isLoading: false,
      }));
      toast.success('Doctor updated successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to update doctor');
      throw error;
    }
  },

  deleteDoctor: async (id) => {
    set({ isLoading: true });
    try {
      await doctorApi.delete(id);
      set((state) => ({
        doctors: state.doctors.filter((doc) => doc._id !== id),
        isLoading: false,
      }));
      toast.success('Doctor deleted successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to delete doctor');
      throw error;
    }
  },
}));
