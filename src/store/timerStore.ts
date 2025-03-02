import { create } from "zustand";

interface TimerData {
  time: string;
  intervalId: NodeJS.Timeout | null;
  lastStartTime: number | null;
}

interface TimerStore {
  isRunning: boolean;
  currentCategoryId: number | null;
  timers: Record<number, TimerData>;
  startTimer: (categoryId: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setCurrentCategoryId: (categoryId: number | null) => void;
  setTimer: (
    categoryId: number,
    time: string | ((prev: string) => string),
  ) => void;
  setIntervalId: (
    categoryId: number,
    intervalId: NodeJS.Timeout | null,
  ) => void;
  initializeTimer: (categoryId: number) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  isRunning: false,
  currentCategoryId: null,
  timers: {},
  startTimer: (categoryId) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [categoryId]: {
          ...state.timers[categoryId],
          lastStartTime: Date.now(),
        },
      },
    })),
  setIsRunning: (isRunning) => set({ isRunning }),
  setCurrentCategoryId: (categoryId) => set({ currentCategoryId: categoryId }),
  setTimer: (categoryId, time) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [categoryId]: {
          ...state.timers[categoryId],
          time:
            typeof time === "function"
              ? time(state.timers[categoryId]?.time || "00:00:00")
              : time,
          lastStartTime: state.timers[categoryId]?.lastStartTime || Date.now(),
        },
      },
    })),

  setIntervalId: (categoryId, intervalId) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [categoryId]: {
          ...state.timers[categoryId],
          intervalId,
        },
      },
    })),
  initializeTimer: (categoryId) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [categoryId]: {
          time: "00:00:00",
          intervalId: null,
          lastStartTime: null,
        },
      },
    })),
}));
