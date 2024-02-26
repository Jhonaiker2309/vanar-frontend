import { Icon } from '../Icon/Icon';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { ShareMenu } from './ShareMenu';
import { shareCurrentPage } from '../../utils/shareCurrentPage';
import { QuestProgress } from './QuestProgress';
import { CreateCard } from './CreateCard';
import { EventPhase } from '../../utils/fetchData';

const ProgressPanel = ({ panelData }: ProgressPanelProps) => {
  const { eventPhases } = panelData;
  const completedWeeks = eventPhases.reduce((total, phase) => {
    return phase.status === 'completed' ? total + 1 : total;
  }, 0);
  const totalWeeks = eventPhases.length;
  const eventCompleted = (completedWeeks / totalWeeks) * 100;
  const handleMobileShare = () => {
    shareCurrentPage();
  };

  return (
    <div className="w-full flex flex-col justify-start items-center md:items-start">
      <p className="text-lg text-[#A08CFF] font-semibold">Feb 2024 - Apr 2024</p>

      <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-16 md:gap-0 mt-28 pt-0">
        <img src="/images/title-velocity.svg" alt="Velocity Title" />

        <div className="hidden md:flex">
          <DropdownMenu
            icon={
              <div className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex items-center justify-center gap-2">
                <Icon name="share" size={24} color="white" />
                Share
              </div>
            }
            content={<ShareMenu />}
          />
        </div>

        <div
          className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 mb-12 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex md:hidden items-center justify-center gap-2"
          onClick={handleMobileShare}
        >
          <Icon name="share" size={24} color="white" />
          Share
        </div>
      </div>

      <div className="w-full items-center">
        <div className="flex md:hidden w-full flex-wrap items-center justify-between py-4 gap-4">
          {eventPhases.map(eventWeek => {
            const { week, status } = eventWeek;
            return <CreateCard key={`week-${week}`} status={status} week={week} isResponsive />;
          })}
        </div>

        <QuestProgress completed={eventCompleted} />

        <div className="hidden md:flex w-full flex-wrap items-center justify-between py-4 gap-4">
          {eventPhases.map(eventWeek => {
            const { week, status } = eventWeek;
            return <CreateCard key={`week-${week}`} status={status} week={week} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;

interface ProgressPanelProps {
  panelData: {
    totalWeeks: number;
    currentWeek: number;
    currentStatus: string;
    eventPhases: EventPhase[];
  };
}
