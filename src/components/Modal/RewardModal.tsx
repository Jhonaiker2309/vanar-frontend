import { ReactNode, useEffect, useState } from 'react';
import useFreezeBack from '../../utils/useFreezeBack';

const RewardModal = ({ show, onClose, children }: RewardModalProps) => {
  const [isOpen, setIsOpen] = useState(show);
  useFreezeBack([isOpen]);

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
      <div className="w-screen h-full fixed inset-0 flex items-center justify-center overflow-auto z-50 ">
        <div
          className="w-[760px] h-[781px] background-reward rounded-[24px] shadow-lg relative z-20 border-[2px] border-[#FFF5F51F] flex items-center justify-center"
          onClick={handleContainerClick}
        >
          <img className="absolute z-0" src="images/V2/background-reward.svg" alt="background" />
          {children}
        </div>
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-[#020504] bg-opacity-95 blur-md z-10"
        ></div>
      </div>
    )
  );
};

export default RewardModal;

interface RewardModalProps {
  show: boolean;
  onClose?: (state: boolean) => void;
  children: ReactNode;
}
