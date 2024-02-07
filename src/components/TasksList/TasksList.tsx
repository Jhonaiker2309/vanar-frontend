import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';

const TasksList = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start text-white gap-8">
      <p className="text-[#a08cff] font-bold">Listed Task</p>
      <div className="w-full flex justify-between items-center pb-4">
        <p className="text-2xl">Task to Complete</p>
        <button className="flex px-4 py-2 rounded-full ring-1 ring-white gap-2">
          <Icon name="crown" size={24} />
          FAQs
        </button>
      </div>
      <Bar percent={50} />
      <div className="w-full flex flex-col gap-4">
        <TaskCard icon="crown" task="Check Documentation" reward={10} />
        <TaskCard icon="share" task="Connect your wallet " reward={10} isCompleted />
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-2xl">Bonus Task</p>
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
    <div className="w-full ring-1 ring-[#4b4b4b] bg-[#1a1a1a] py-6 px-12 flex items-center justify-between rounded-xl">
      <div className="flex items-center justify-start gap-4">
        <Icon name={icon} size={24} color="white" />
        <p>{task}</p>
      </div>

      <div
        className={`flex items-center justify-center py-1 px-4 gap-1 ring-1 rounded-full text-xl ${
          isCompleted ? 'ring-[#a08cff] bg-[#4b4760]' : 'ring-[#4b4b4b] bg-[#2b2b2b]'
        }`}
      >
        <p>{isCompleted ? 'Completed' : `${reward}XP`}</p>
      </div>
    </div>
  );
};
