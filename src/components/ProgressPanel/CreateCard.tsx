import { Icon } from '../Icon/Icon';

export const CreateCard = ({
  status,
  week,
  isFinal = false,
  isResponsive = false,
}: CreateCardProps) => {
  const isInProgress = status === 'running';
  const isCompleted = status === 'completed';

  const renderStatus = () => {
    if (status === 'running') return 'In progress';
    if (status === 'completed') return 'Completed';
    return 'Blocked';
  };

  const getStatusColor = () => {
    if (isCompleted) return '[#A08CFF]';
    if (isInProgress) return '[#ecaa00]';
    return '';
  };

  return (
    <div className="w-[80px] m-auto md:w-[125px] py-4 rounded-xl flex flex-col justify-end items-center gap-4 bg-[#1a1a1a] ring-2 ring-[#F6F6F633]">
      <Icon
        name={isFinal ? 'crown' : status === 'blocked' ? 'lock' : 'unlock'}
        size={isResponsive ? 16 : 48}
        color={isCompleted ? '#A08CFF' : isInProgress ? '#ecaa00' : ''}
      />
      <div className="flex flex-col justify-end items-center gap-2 text-white text-[10px] md:text-xs">
        <p>{isFinal ? 'Congrats' : `Week 0${week}`}</p>
        <div
          className={`text-[8px] md:text-base px-3 md:py-1 rounded md:rounded-full text-nowrap bg-${getStatusColor()}`}
        >
          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

interface CreateCardProps {
  status: string;
  week?: number;
  isFinal?: boolean;
  isResponsive?: boolean;
}
