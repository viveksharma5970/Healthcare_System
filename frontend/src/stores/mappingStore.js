import { create } from 'zustand';
import { mappingApi } from '../lib/api';
import { toast } from 'react-toastify';

export const useMappingStore = create((set) => ({
  mappings: [],
  isLoading: false,
  assignedDoctors: [],

  fetchMappings: async () => {
    set({ isLoading: true });
    try {
      const response = await mappingApi.getAll();
      set({ mappings: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch mappings');
    }
  },

  assignDoctor: async (data) => {
    set({ isLoading: true });
    try {
      const response = await mappingApi.assign(data);
      set((state) => ({
        mappings: [...state.mappings.filter(m => m.patientId._id !== response.data.patientId), response.data],
        isLoading: false,
      }));
      toast.success('Doctor assigned successfully!');
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to assign doctor');
      throw error;
    }
  },

  fetchDoctorsByPatient: async (patientId) => {
    set({ isLoading: true });
    try {
      const response = await mappingApi.getDoctorsByPatient(patientId);
      set({ assignedDoctors: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, assignedDoctors: [] });
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch assigned doctors');
      }
    }
  },

  unassignDoctor: async (patientId, doctorId) => {
    set({ isLoading: true });
    try {
      await mappingApi.unassign(patientId, doctorId);
      set({ isLoading: false });
      toast.success('Doctor unassigned successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to unassign doctor');
      throw error;
    }
  },
}));
