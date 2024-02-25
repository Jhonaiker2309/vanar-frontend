import { useState, useContext, useEffect } from 'react';
import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';
import { Web3Context } from '../../web3';
import { Task } from '../../utils/fetchData';
import { handleClickTask } from '../../utils/handleClickTask';

export const TasksList = ({ tasks }: TasksProps) => {
  const handleFillBar = () => {
    const weekTasks = tasks.filter(task => !task.isBonus);
    const weekTasksCompleted = weekTasks.filter(task => task.completed);
    return (weekTasksCompleted.length / weekTasks.length) * 100;
  };

  const renderTaskCards = (isBonus: boolean) => {
    return tasks
      .filter(task => task.isBonus === isBonus)
      .map((task, i) => (
        <TaskCard
          logo={task.logo}
          text={task.text}
          link={task.link}
          experience={task.experience}
          completed={task.completed}
          key={i}
        />
      ));
  };

  return (
    <div className="w-full flex flex-col items-start justify-start text-white gap-8">
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-[#A08CFF] text-lg font-bold">Listed Task</p>
          <p className="text-[28px] md:text-[44px]">Task to Complete</p>
        </div>
      </div>
      <Bar percent={handleFillBar()} />
      <div className="w-full flex flex-col gap-4">{renderTaskCards(false)}</div>
      {tasks.some(task => task.isBonus) && (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[28px] md:text-[44px]">Bonus Task</p>
            <Icon name="fire" size={40} />
          </div>
          {renderTaskCards(true)}
        </div>
      )}
    </div>
  );
};

const TaskCard = ({ logo, text, experience, link, completed }: Task) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { account } = useContext(Web3Context);

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]);

  return (
    <div
      className={`w-full ring-1 ring-[#4b4b4b] bg-[#1a1a1a] py-6 px-4 md:px-12 flex items-center justify-between rounded-[20px] ${
        link && 'cursor-pointer'
      }`}
      onClick={() => handleClickTask(account, setIsCompleted, link)}
    >
      <div className="flex items-center justify-start gap-4">
        <img src={logo} />
        <p className="text-sm md:text-lg">{text}</p>
      </div>

      <div
        className={`flex items-center justify-center py-2 px-6 gap-1 ring-1 rounded-full text-xs  md:text-xl ${
          isCompleted ? 'ring-[#A08CFF] bg-[#A08CFF29]' : 'ring-[#4b4b4b] bg-[#2b2b2b]'
        }`}
      >
        {isCompleted ? <p className="font-semibold">Completed</p> : <p>{experience} VP</p>}
      </div>
    </div>
  );
};

interface TasksProps {
  tasks: Task[];
}
