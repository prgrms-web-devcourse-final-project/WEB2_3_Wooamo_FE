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

let toastId = 0;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: (message: string) => {
    const id = `${toastId}-${message}`;
    const newToast = { id, message, isAnimating: true };
    set((prev) => ({
      toasts: [...prev.toasts, newToast],
    }));
    toastId = ++toastId % Number.MAX_SAFE_INTEGER;

    setTimeout(() => {
      set((prev) => ({
        toasts: prev.toasts.map((toast) =>
          toast.id === newToast.id ? { ...toast, isAnimating: false } : toast,
        ),
      }));
    }, 3000);
    setTimeout(() => {
      set((prev) => ({
        toasts: prev.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3300);
  },
}));
