import { create } from "zustand";

interface ToastProps {
  id: string;
  message: string;
  isAnimating: boolean;
}

interface ToastStore {
  toasts: ToastProps[];
  showToast: (message: string) => void;
}

let id = 0;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: (message: string) => {
    const newToast = { id: `${id}-${message}`, message, isAnimating: true };
    set((prev) => ({
      toasts: [...prev.toasts, newToast],
    }));
    id = ++id % Number.MAX_SAFE_INTEGER;

    setTimeout(() => {
      set((prev) => ({
        toasts: prev.toasts.map((toast) =>
          toast.id === newToast.id ? { ...toast, isAnimating: false } : toast,
        ),
      }));
    }, 3000);
    setTimeout(() => {
      set((prev) => ({
        toasts: prev.toasts.filter((toast) => toast.message !== message),
      }));
    }, 3300);
  },
}));
