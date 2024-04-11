import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

const secureStorage = {
  getItem: async (name: string) => {
    try {
      const item = await RNSecureStorage.getItem(name);
      return JSON.parse(item as any);
    } catch (error) {
      console.error('Failed to get item from secure storage', error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await RNSecureStorage.setItem(name, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Failed to set item in secure storage', error);
    }
  },
  removeItem: async (name: string) => {
    try {
      await RNSecureStorage.removeItem(name);
    } catch (error) {
      console.error('Failed to remove item from secure storage', error);
    }
  },
};

const useAuthStore = create(
  persist(
    set => ({
      authToken: null,
      setAuthToken: (token: string) => set({ authToken: token }),
      clearAuthToken: () => set({ authToken: null }),
    }),
    { name: 'authStore', storage: createJSONStorage(() => secureStorage) },
  ),
);

export default useAuthStore;
