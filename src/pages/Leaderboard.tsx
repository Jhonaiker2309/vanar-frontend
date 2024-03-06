import React from 'react';

const Leaderboard = () => {
  return (
    <div className="p-8 bg-[#A08CFF] bg-opacity-10 rounded-[25px] w-2/3 h-2/3">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-6 text-white">
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <div className="h-12 flex justify-center items-center text-xs md:text-[18px] min-w-fit w-fit bg-[#A08CFF] bg-opacity-20  text-white ring-1 ring-[#A08CFF] py-2 md:py-3 px-2 md:px-6 rounded-full gap-2">
            <p className="text-nowrap">Your Rank:</p>
            <p className="text-nowrap text-2xl font-bold">12th</p>
          </div>
        </div>
        SEARCH BAR
      </div>
      <div className="w-full flex flex-col p-4 overflow-scroll ">
        <div className="w-full flex justify-evenly bg-[#A08CFF] bg-opacity-5 text-[#A08CFF] py-4 rounded-xl ring-1 ring-inset ring-[#A08CFF] ring-opacity-50 shadow-[#A08CFF] shadow-light">
          <p>POSITION</p>
          <p>POINTS / VP</p>
          <p>WALLET</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
