import { twMerge } from 'tailwind-merge';
import { Icon } from '../Icon/Icon';

type InfoHintProps = {
  hint: JSX.Element | JSX.Element[] | string;
  hintPosition?: 'left' | 'right' | 'top' | 'bottom';
};

export const Hint = ({ hint, hintPosition = 'top' }: InfoHintProps) => {
  const positions = {
    left: 'top-1/2 -translate-y-1/2 right-[110%]',
    right: 'top-1/2 -translate-y-1/2 left-[110%]',
    top: 'left-1/2 -translate-x-1/2 bottom-[110%]',
    bottom: 'left-1/2 -translate-x-1/2 top-[110%]',
  };

  return (
    <span className="ml-1 cursor-pointer relative group flex items-center">
      <Icon name="icon-hint" color="White" size={20} />
      <span className="invisible group-hover:visible">
        <div
          className={twMerge(
            ` bg-white m-auto z-10 min-w-[200px] w-fit absolute py-1.5 px-3 rounded-lg text-center text-sm font-normal`,
            positions[hintPosition],
          )}
        >
          {hint}
        </div>
      </span>
    </span>
  );
};
