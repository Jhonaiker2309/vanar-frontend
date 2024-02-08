import { Icon } from '../Icon/Icon';

const ProgressPanel = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <p className="text-lg text-[#A08CFF] font-semibold">19th Feb 2024 - 19th Apr 2024</p>
      <div className="w-full flex items-end justify-between">
        <img src="/images/title-velocity.svg" />
        <button className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex items-center justify-center gap-2">
          <Icon name="share" size={24} color="white" />
          Share
        </button>
      </div>
      <div className="w-full bg-[#0b0b0b] border-2 border-[#101010] rounded-xl mt-[74px] flex items-center justify-end gap-4 p-8">
        <CreateCard status="Completed" week={1} />
        <CreateCard status="In Progress" week={2} />
        <CreateCard status="Locked" week={3} />
        <CreateCard status="Locked" week={4} />
        <CreateCard status="Locked" week={5} />
        <CreateCard status="Locked" isFinal />
      </div>
    </div>
  );
};

export default ProgressPanel;

interface CreateCardProps {
  status: 'Completed' | 'Locked' | 'In Progress';
  week?: number;
  isFinal?: boolean;
}

const CreateCard = ({ status, week, isFinal = false }: CreateCardProps) => {
  const isInProgress = status === 'In Progress';
  const isCompleted = status === 'Completed';

  return (
    <div className="w-full flex flex-col justify-end items-center gap-8">
      <div className="w-full p-4 rounded-xl flex flex-col justify-end items-center gap-4 bg-[#1a1a1a] ring-2 ring-[#4d4d4d] ">
        <Icon
          name={isFinal ? 'crown' : 'lock'}
          size={48}
          color={isCompleted ? '#A08CFF' : isInProgress ? '#ecaa00' : ''}
        />
        <div className="flex flex-col justify-end items-center gap-2 text-white text-xs">
          <p>{isFinal ? 'Congrats' : `Week 0${week}`}</p>

          <div
            className={`px-3 py-1 rounded-full  ${
              isCompleted ? 'bg-[#A08CFF]' : isInProgress ? 'bg-[#ecaa00]' : 'bg-[#4b4b4b]'
            }`}
          >
            {status}
          </div>
        </div>
      </div>
      <div
        className={`w-full h-2 rounded-full bg- ${
          isCompleted ? 'bg-[#A08CFF]' : isInProgress ? 'bg-[#ecaa00]' : 'bg-[#4b4b4b]'
        }`}
      />
    </div>
  );
};
