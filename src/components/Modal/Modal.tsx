import { ReactNode, useEffect, useState } from 'react';
import { Icon } from '../Icon/Icon';

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  useEffect(() => {
    const handleCloseOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose(false);
      }
    };

    document.addEventListener('keydown', handleCloseOnEscape);

    return () => {
      document.removeEventListener('keydown', handleCloseOnEscape);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    isOpen &&
    show && (
      <div className="w-screen h-full fixed inset-0 flex items-start justify-center overflow-scroll z-50 ">
        <div
          className="w-full bg-fndWhite rounded-lg shadow-lg relative z-20"
          onClick={handleContainerClick}
        >
          {children}
          <button
            className="fixed top-5 right-5 text-white hover:text-white z-50"
            onClick={handleClose}
          >
            <Icon name="cross" size={40} color="white" />
          </button>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-95 z-10"></div>
      </div>
    )
  );
};

export default Modal;

interface ModalProps {
  show: boolean;
  onClose?: (state: boolean) => void;
  children: ReactNode;
}
