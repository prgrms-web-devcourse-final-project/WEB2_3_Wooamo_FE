"use client";

import { useModalStore } from "@/store/modalStore";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: ReactNode;
  modalId: string;
  className?: string;
  onClose?: () => void;
}

export default function Modal({
  children,
  modalId,
  className,
  onClose,
}: ModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const currentModalId = useModalStore((state) => state.currentModalId);
  const { close, setDialogRef } = useModalStore((state) => state);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      if (onClose) onClose();
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    setDialogRef(dialogRef as React.RefObject<HTMLDialogElement>);
  }, [setDialogRef]);

  if (!mounted || !document.getElementById("modal-root")) return null;

  return isOpen && currentModalId === modalId
    ? createPortal(
        <dialog
          id="modal"
          onClick={(e) => {
            if ((e.target as HTMLElement).nodeName === "DIALOG") {
              close();
            }
          }}
          ref={dialogRef}
          className={twMerge(
            `flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] backdrop:bg-site-black-50 rounded-[10px]`,
            className,
          )}
        >
          <div className="w-full px-5 pt-16 pb-7">
            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5"
            >
              <CloseRoundedIcon />
            </button>
            {children}
          </div>
        </dialog>,
        document.getElementById("modal-root") as HTMLElement,
      )
    : null;
}
