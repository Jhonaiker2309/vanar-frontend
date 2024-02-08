import ProgressPanel from '../ProgressPanel/ProgressPanel';
import { MessageSection } from '../MessageSection/MessageSection';
import TasksList from '../TasksList/TasksList';

const MainSection = () => {
  return (
    <div className="w-2/3 h-fit bg-black absolute top-[101px] px-36 pt-52 pb-6 flex flex-col items-start gap-12">
      <ProgressPanel />
      <MessageSection />
      <TasksList />
    </div>
  );
};

export default MainSection;
