import ProgressPanel from '../ProgressPanel/ProgressPanel';
import { MessageSection } from '../MessageSection/MessageSection';
import { TasksList } from '../TasksList/TasksList';
import { MainSectionData } from '../../utils/fetchData';
import { FAQ } from '../FAQ/FAQ';

const MainSection = ({
  totalWeeks,
  currentWeek,
  currentStatus,
  tasks,
  eventPhases,
}: MainSectionData) => {
  const panelData = {
    totalWeeks,
    currentWeek,
    currentStatus,
    eventPhases,
  };

  return (
    <div className="w-full md:w-2/3 h-fit bg-black opacity-90 md:absolute md:top-[101px] px-12 md:px-36 pt-52 pb-6 flex flex-col items-start gap-12">
      <ProgressPanel panelData={panelData} />
      <MessageSection />
      <TasksList tasks={tasks} />
      <FAQ />
    </div>
  );
};

export default MainSection;
