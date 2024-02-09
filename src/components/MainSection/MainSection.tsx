import ProgressPanel from '../ProgressPanel/ProgressPanel';
import { MessageSection } from '../MessageSection/MessageSection';
import TasksList from '../TasksList/TasksList';

const MainSection = () => {
  return (
    <div className="w-full md:w-2/3 h-fit bg-black opacity-90 md:absolute md:top-[101px] px-12 md:px-36 pt-52 pb-6 flex flex-col items-start gap-12">
      <ProgressPanel />
      <MessageSection />
      <TasksList tasks={tasks} />
    </div>
  );
};

// THIS IS DUMMY DATA
const tasks = [
  {
    icon: 'fire',
    text: 'Example 1',
    reward: 10,
    isCompleted: false,
  },
  {
    icon: 'crown',
    text: 'Example 2',
    reward: 20,
    isCompleted: true,
    isBonus: true,
  },
  {
    icon: 'hint',
    text: 'Example 3',
    reward: 10,
    isCompleted: true,
  },
  {
    icon: 'wallet',
    text: 'Example 4',
    reward: 10,
    isCompleted: true,
  },
  {
    icon: 'file',
    text: 'Example 5',
    reward: 10,
    isCompleted: false,
  },
  {
    icon: 'thunder',
    text: 'Example 6',
    reward: 20,
    isCompleted: false,
    isBonus: true,
  },
  {
    icon: 'lock',
    text: 'Example 7',
    reward: 10,
    isCompleted: false,
  },
  {
    icon: 'interact',
    text: 'Example 8',
    reward: 20,
    isCompleted: false,
    isBonus: true,
  },
];

export default MainSection;
