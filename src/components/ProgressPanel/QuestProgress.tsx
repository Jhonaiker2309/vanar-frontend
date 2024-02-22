import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';

export const QuestProgress = ({ completed }: QuestProgressProps) => {
  return (
    <div className="w-full bg-[#0b0b0b] border-2 border-[#101010] rounded-xl mt-0 md:mt-[74px] flex items-center justify-end gap-1 py-4 px-4 md:gap-8 md:p-8">
      <p className="min-w-fit text-base  md:text-xl text-white">Quest Progress</p>
      <Bar percent={completed} />
      <Icon name="trophy" size={36} />
    </div>
  );
};

interface QuestProgressProps {
  completed: number;
}
