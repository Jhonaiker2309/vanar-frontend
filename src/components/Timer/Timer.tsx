import { useState, useEffect } from 'react';

interface TimerProps {
  futureTime: Date;
}

const Timer = ({ futureTime }: TimerProps) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const future = new Date(futureTime).getTime();
    const difference = future - now;

    if (difference <= 0 || !futureTime) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [futureTime]);

  const { hours, minutes, seconds } = timeRemaining;

  return (
    <div className="w-full flex flex-col items-center bg-[#03D9AF0F] rounded-2xl px-16 py-8 gap-8">
      <h1 className="text-[26px] text-center text-white font-semibold">Time until new spins</h1>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[50px] md:w-[70px] py-2 md:py-4 rounded-2xl flex items-center justify-center bg-[#03D9AF1A] border-[#03D9AF24] border-[1px] timer-light">
            <p className="text-xl md:text-[28px] text-white font-bold">
              {String(hours).padStart(2, '0')}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#ADADAD]">Hours</p>
        </div>
        <p className="md:text-4xl text-xl text-white font-black pb-8">:</p>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[50px] md:w-[70px] py-2 md:py-4 rounded-2xl flex items-center justify-center bg-[#03D9AF1A] border-[#03D9AF24] border-[1px] timer-light">
            <p className="text-xl md:text-[28px] text-white font-bold">
              {String(minutes).padStart(2, '0')}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#ADADAD]">Mins</p>
        </div>
        <p className="md:text-4xl text-xl text-white font-black pb-8">:</p>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-[50px] md:w-[70px] py-2 md:py-4 rounded-2xl flex items-center justify-center bg-[#03D9AF1A] border-[#03D9AF24] border-[1px] timer-light">
            <p className="text-xl md:text-[28px] text-white font-bold">
              {String(seconds).padStart(2, '0')}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#ADADAD]">Secs</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
