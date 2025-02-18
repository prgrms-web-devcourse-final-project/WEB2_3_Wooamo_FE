"use client";

import { useModalStore } from "@/store/modalStore";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const isOpen = useModalStore((state) => state.isOpen);
  const { close, setDialogRef } = useModalStore((state) => state);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    setDialogRef(dialogRef as React.RefObject<HTMLDialogElement>);
  }, [setDialogRef]);

  if (!mounted || !document.getElementById("modal-root")) return null;

  return isOpen
    ? createPortal(
        <dialog
          id="modal"
          onClose={close}
          onClick={(e) => {
            if ((e.target as HTMLElement).nodeName === "DIALOG") {
              close();
            }
          }}
          ref={dialogRef}
          className="flex items-center justify-center relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] px-5 pt-16 pb-7 backdrop:bg-site-black-50 rounded-[10px]"
        >
          <div>{children}</div>
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5"
          >
            <CloseRoundedIcon />
          </button>
        </dialog>,
        document.getElementById("modal-root") as HTMLElement,
      )
    : null;
}
