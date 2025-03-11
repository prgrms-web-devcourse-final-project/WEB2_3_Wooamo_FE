import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: userType | null;
  setUser: (user: userType | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
    },
  ),
);
