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
    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="Black" />
  );

  return (
    <div className="w-full rounded-2xl bg-[#06080C0F] px-8 py-4" z-50>
      <div
        className="flex items-center w-full justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        {title}
        {iconExpanded}
      </div>

      {isExpanded && <div className="w-full py-4">{children}</div>}
    </div>
  );
};
