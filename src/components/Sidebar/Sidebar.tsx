import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/3 h-[95%] bg-[#1c1a23] opacity-80 absolute right-0 mt-[101px] flex flex-col items-center p-8 gap-8">
      <div className="w-full flex items-center justify-between  text-white text-4xl font-semibold">
        <p>Reward</p>
        <p>
          70
          <span className="text-[#ecaa00] pl-1">XP</span>
        </p>
      </div>
      <div className="w-full h-3/4 relative ring-1 ring-white rounded-lg"></div>
      <button className="w-full h-fit px-8 py-2 rounded-full ring-1 ring-white text-white">
        Complete the quest to check if you are eligible for gasless Claim.
      </button>
    </div>
  );
};

export default Sidebar;
