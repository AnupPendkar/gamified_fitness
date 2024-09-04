import { create } from 'zustand';
import { AxiosError } from 'axios';
import { ToastMessage } from './typings/common';

export type GlobalState = {
  error?: unknown;
  isLoading?: boolean;
  message?: ToastMessage | null;
  setLoading: (flag: boolean) => void;
  setError: (error: AxiosError) => void;
  setToasterMessage: (message: ToastMessage) => void;
};

export const useAppStore = create<GlobalState>((set) => ({
  error: null,
  isLoading: false,
  message: null,
  setLoading: (flag) => set({ isLoading: flag }),
  setError: (error) => set({ error }),
  setToasterMessage: (message) => set({ message }),
}));
