import { useState } from 'react';
import { Icon } from '../Icon/Icon';

export type AccordionProps = {
  title: JSX.Element;
  children: React.ReactNode;
  expanded?: boolean;
};

export const Accordion = ({ title, children, expanded }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded || false);

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
