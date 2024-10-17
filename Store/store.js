import create from 'zustand';

const useGlobalStore = create(set => ({
  userId: null,
  starttime: null,
  setUserId: (userId) => set({ userId }),
  setStarttime: (starttime) => set({ starttime }),
}));

export default useGlobalStore;