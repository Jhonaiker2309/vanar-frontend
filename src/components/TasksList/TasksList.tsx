import { useState } from 'react';
import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';
import Modal from '../Modal/Modal';
import FAQ from '../FAQ/FAQ';

const TasksList = ({ tasks }: TasksProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleFillBar = () => {
    const weekTasks = tasks.filter(task => !task.isBonus);
    const weekTasksCompleted = weekTasks.filter(task => task.isCompleted);
    return (weekTasksCompleted.length / weekTasks.length) * 100;
  };

  return (
    <div className="w-full flex flex-col items-start justify-start text-white gap-8">
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-[#A08CFF] text-lg font-bold">Listed Task</p>
          <p className="text-[28px] md:text-[44px]">Task to Complete</p>
        </div>
        <button
          className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex items-center justify-center gap-2"
          onClick={handleOpenModal}
        >
          <Icon name="hint" size={24} />
          FAQs
        </button>
      </div>
      <Bar percent={handleFillBar()} />
      <div className="w-full flex flex-col gap-4">
        {tasks.map((task, i) => {
          const { icon, text, reward, isCompleted, isBonus } = task;
          return (
            !isBonus && (
              <TaskCard icon={icon} text={text} reward={reward} isCompleted={isCompleted} key={i}/>
            )
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[28px] md:text-[44px]">Bonus Task</p>
          <Icon name="fire" size={40} />
        </div>
        {tasks.map((task, i) => {
          const { icon, text, reward, isCompleted, isBonus } = task;
          return (
            isBonus && (
              <TaskCard icon={icon} text={text} reward={reward} isCompleted={isCompleted} key={i} />
            )
          );
        })}
      </div>
      <Modal show={isOpenModal} onClose={handleOpenModal}>
        <FAQ />
      </Modal>
    </div>
  );
};

export default TasksList;

interface Task {
  icon: string;
  text: string;
  reward: number;
  isCompleted?: boolean;
  isBonus?: boolean;
}

interface TasksProps {
  tasks: Task[];
}

const TaskCard = ({ icon, text, reward, isCompleted = false }: Task) => {
  return (
    <div className="w-full ring-1 ring-[#4b4b4b] bg-[#1a1a1a] py-6 px-4 md:px-12 flex items-center justify-between rounded-[20px]">
      <div className="flex items-center justify-start gap-4">
        <Icon name={icon} size={24} color="white" />
        <p className="text-sm md:text-lg">{text}</p>
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
