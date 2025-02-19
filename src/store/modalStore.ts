import { RefObject } from "react";
import { create } from "zustand";

interface ModalStore {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  currentModalId: string | null;
  setDialogRef: (ref: RefObject<HTMLDialogElement>) => void;
  open: (modalId: string) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  dialogRef: { current: null },
  isOpen: false,
  currentModalId: null,
  setDialogRef: (ref: RefObject<HTMLDialogElement>) => set({ dialogRef: ref }),
  open: (modalId: string) =>
    set(() => ({
      isOpen: true,
      currentModalId: modalId,
    })),
  close: () =>
    set({
      isOpen: false,
      currentModalId: null,
    }),
}));
