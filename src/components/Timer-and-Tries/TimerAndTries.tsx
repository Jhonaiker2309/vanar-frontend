import Timer from '../Timer/Timer';
import Tries from '../Tries/Tries';

interface TimerAndTriesProps {
  futureTime: Date;
  currentSpin: number;
}
const TimerAndTries = ({ futureTime, currentSpin }: TimerAndTriesProps) => {
  return (
    <div className="w-full 2xl:w-[410px] p-4 flex flex-col items-center justify-center gap-4 border-[1px] bg-[#030605dd] xl:bg-transparent border-[#F6F6F60A] rounded-2xl">
      <Timer futureTime={futureTime} />
      <Tries currentSpin={currentSpin} />
    </div>
  );
};

export default TimerAndTries;
