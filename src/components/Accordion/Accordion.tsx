import { useState, useEffect } from 'react';
import { Icon } from '../Icon/Icon';

export type AccordionProps = {
  title: JSX.Element;
  children: React.ReactNode;
  isOpen: boolean;
};

export const Accordion = ({ title, children, isOpen }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const iconExpanded = (
    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
  );

  return (
    <>
      <div
        className="flex items-center w-full justify-between gap-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        {title}
        {iconExpanded}
      </div>

      {isExpanded && <div className="w-full">{children}</div>}
    </>
  );
};
