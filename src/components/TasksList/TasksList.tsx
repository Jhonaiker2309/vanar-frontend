import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';

const TasksList = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start text-white gap-8">
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-[#A08CFF] text-lg font-bold">Listed Task</p>
          <p className="text-[28px] md:text-[44px]">Task to Complete</p>
        </div>
        <button className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex items-center justify-center gap-2">
          <Icon name="hint" size={24} />
          FAQs
        </button>
      </div>
      <Bar percent={50} />
      <div className="w-full flex flex-col gap-4">
        <TaskCard icon="crown" task="Check documentation at Gitbook" reward={10} />
        <TaskCard icon="share" task="Connect your wallet " reward={10} isCompleted />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[28px] md:text-[44px]">Bonus Task</p>
          <Icon name="fire" size={40} />
        </div>
        <TaskCard icon="lock" task="Follow on Twitter" reward={10} />
      </div>
    </div>
  );
};

export default TasksList;

interface TaskCardProps {
  icon: string;
  task: string;
  reward: number;
  isCompleted?: boolean;
}

const TaskCard = ({ icon, task, reward, isCompleted = false }: TaskCardProps) => {
  return (
    <div className="w-full ring-1 ring-[#4b4b4b] bg-[#1a1a1a] py-6 px-4 md:px-12 flex items-center justify-between rounded-[20px]">
      <div className="flex items-center justify-start gap-4">
        <Icon name={icon} size={24} color="white" />
        <p className="text-sm md:text-lg">{task}</p>
      </div>

      <div
        className={`flex items-center justify-center py-2 px-6 gap-1 ring-1 rounded-full text-xs  md:text-xl ${
          isCompleted ? 'ring-[#A08CFF] bg-[#A08CFF29]' : 'ring-[#4b4b4b] bg-[#2b2b2b]'
        }`}
      >
        {isCompleted ? <p className="font-semibold">Completed</p> : <p>{reward}XP</p>}
      </div>
    </div>
  );
};
