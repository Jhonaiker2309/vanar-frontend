import { useState, useRef, ReactNode, RefObject, useEffect } from 'react';

interface DropdownMenuProps {
  icon: ReactNode;
  content: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useHandleClickOutsideRef(dropdownRef, () => {
    setIsOpen(false);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-sm:static relative rounded-2xl " ref={dropdownRef}>
      <div className="cursor-pointer" onClick={toggleMenu}>
        {icon}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-fit rounded-2xl shadow-lg max-sm:-right-20">
          {content}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

const useHandleClickOutsideRef = (ref: RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, ref]);
};
