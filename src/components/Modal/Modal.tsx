import { ReactNode, useEffect, useState } from 'react';
import { Icon } from '../Icon/Icon';

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  useEffect(() => {
    const handleCloseOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
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
      onClose();
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <div
        className="fixed w-full h-fit pt-28 inset-0 flex items-center justify-start overflow-scroll md:pl-10 z-50"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-screen lg:w-fit h-fit lg:min-w-screen lg:max-w-[1200px] lg:min-w-[900px] relative z-20 "
          onClick={handleContainerClick}
        >
          {children}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-50"
            onClick={handleClose}
          >
            <Icon name="cross" size={24} color="white" />
          </button>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-95 z-10"></div>
      </div>
    )
  );
};

export default Modal;
