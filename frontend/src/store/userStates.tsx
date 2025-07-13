import { create } from "zustand";
interface User {
  firstName: string;
  secondName: string;
  emailAddress: string;
  userName: string;
  id: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
