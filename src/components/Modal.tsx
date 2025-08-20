import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  setModalOpen: (open: boolean) => void;
};

const Modal = ({ children, setModalOpen }: ModalProps) => {
  return createPortal(
    <div
      className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      onClick={() => setModalOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
