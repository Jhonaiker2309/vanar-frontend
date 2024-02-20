import { useState, useRef, ReactNode, useEffect } from 'react';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="max-sm:static relative rounded-2xl" ref={dropdownRef}>
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

interface DropdownMenuProps {
  icon: ReactNode;
  content: ReactNode;
}
