import { useState, useContext, useEffect } from 'react';
import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';
import Modal from '../Modal/Modal';
import FAQ from '../FAQ/FAQ';
import axios from 'axios';
import { Web3Context } from '../../web3';

const TasksList = ({ tasks }: TasksProps) => {
  console.log(tasks);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleFillBar = () => {
    const weekTasks = tasks.filter(task => !task.isBonus);
    const weekTasksCompleted = weekTasks.filter(task => task.completed);
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
          const { logo, text, experience, completed, isBonus, link } = task;
          return (
            !isBonus && (
              <TaskCard
                logo={logo}
                text={text}
                link={link}
                experience={experience}
                completed={completed}
                key={i}
              />
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
          const { logo, text, experience, completed, isBonus, link } = task;
          return (
            isBonus && (
              <TaskCard
                logo={logo}
                text={text}
                link={link}
                experience={experience}
                completed={completed}
                key={i}
              />
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
  completed: boolean;
  experience: number;
  link?: string;
  logo: string;
  text: string;
  isBonus?: boolean;
}

interface TasksProps {
  tasks: Task[];
}

const TaskCard = ({ logo, text, experience, link, completed = false }: Task) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { account } = useContext(Web3Context);
  const handleClickTask = async () => {
    try {
      const response = await axios.post('https://vanar-backend.vercel.app/visitLink', {
        account: account,
        link: link,
      });

      if (response.status === 200) {
        window.open(link, '_blank');
        setIsCompleted(true);
      } else {
        throw new Error('Failed to visit link');
      }
    } catch (error) {
      console.error('Error visiting link:', error);
      throw error;
    }
  };

  return (
    <div
      className={`w-full ring-1 ring-[#4b4b4b] bg-[#1a1a1a] py-6 px-4 md:px-12 flex items-center justify-between rounded-[20px] ${
        link && 'cursor-pointer'
      }`}
      onClick={handleClickTask}
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
        {isCompleted ? <p className="font-semibold">Completed</p> : <p>{experience}XP</p>}
      </div>
    </div>
  );
};
