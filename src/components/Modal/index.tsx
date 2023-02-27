import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }
  console.log(children, onClose);

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        onClick={() => onClose && onClose()}
        className={`modal-overlay ${isOpen ? 'opacity-100 z-40' : 'opacity-0 -z-50'}`}
        data-testid="modal-overlay"
      ></div>
      <div className={`modal-container ${isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'}`} role="dialog">
        {children}
      </div>
    </>
  );
};

export default Modal;
