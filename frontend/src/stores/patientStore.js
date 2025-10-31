import { create } from 'zustand';
import { patientApi } from '../lib/api';
import { toast } from 'react-toastify';

export const usePatientStore = create((set) => ({
  patients: [],
  isLoading: false,
  selectedPatient: null,

  fetchPatients: async () => {
    set({ isLoading: true });
    try {
      const response = await patientApi.getAll();
      set({ patients: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch patients');
      } else {
        set({ patients: [] });
      }
    }
  },

  fetchPatientById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await patientApi.getById(id);
      set({ selectedPatient: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch patient details');
    }
  },

  createPatient: async (data) => {
    set({ isLoading: true });
    try {
      const response = await patientApi.create(data);
      set((state) => ({
        patients: [...state.patients, response.data],
        isLoading: false,
      }));
      toast.success('Patient added successfully!');
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || 'Failed to add patient');
      throw error;
    }
  },

  updatePatient: async (id, data) => {
    set({ isLoading: true });
    try {
      await patientApi.update(id, data);
      set((state) => ({
        patients: state.patients.map((patient) =>
          patient._id === id ? { ...patient, ...data } : patient
        ),
        isLoading: false,
      }));
      toast.success('Patient updated successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to update patient');
      throw error;
    }
  },

  deletePatient: async (id) => {
    set({ isLoading: true });
    try {
      await patientApi.delete(id);
      set((state) => ({
        patients: state.patients.filter((patient) => patient._id !== id),
        isLoading: false,
      }));
      toast.success('Patient deleted successfully!');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to delete patient');
      throw error;
    }
  },
}));
