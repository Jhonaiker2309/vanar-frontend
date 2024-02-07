import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';

const TasksList = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start text-white">
      <p className="text-[#a08cff] font-bold">Listed Task</p>
      <div className="w-full flex justify-between items-center pb-4">
        <p className="text-2xl">Task to Complete</p>
        <button className="flex px-4 py-2 rounded-full ring-1 ring-white gap-2">
          <Icon name="crown" size={24} />
          FAQs
        </button>
      </div>
      <Bar percent={50} />
    </div>
  );
};

export default TasksList;
