import { ReactNode, useEffect, useState } from 'react';

const LateralModal = ({ show, onClose, children }: ModalProps) => {
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
      <div className="w-screen h-screen fixed inset-0 flex items-start justify-end overflow-scroll z-50 ">
        <div
          className="w-full md:w-1/3 h-full bg-white rounded-l-[40px] shadow-lg relative z-40 faq-modal"
          onClick={handleContainerClick}
        >
          {children}
          <button
            className="absolute top-5 left-5 text-white hover:text-white z-50"
            onClick={handleClose}
          >
            <img src="images/V2/icon-return-arrow.svg" alt="return button" />
          </button>
        </div>
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-10 "
          onClick={handleContainerClick}
        />
      </div>
    )
  );
};

export default LateralModal;

interface ModalProps {
  show: boolean;
  onClose?: (state: boolean) => void;
  children: ReactNode;
}
