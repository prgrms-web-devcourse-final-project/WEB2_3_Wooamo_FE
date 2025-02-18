import { RefObject } from "react";
import { create } from "zustand";

interface ModalStore {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  setDialogRef: (ref: RefObject<HTMLDialogElement>) => void;
  open: () => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  dialogRef: { current: null },
  isOpen: false,
  setDialogRef: (ref: RefObject<HTMLDialogElement>) => set({ dialogRef: ref }),
  open: () =>
    set((state) => {
      state.dialogRef.current?.showModal();
      return { ...state, isOpen: true };
    }),
  close: () =>
    set((state) => {
      state.dialogRef.current?.close();
      return { ...state, isOpen: false };
    }),
}));
