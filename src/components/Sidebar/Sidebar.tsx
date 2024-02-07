const Sidebar = () => {
  return (
    <div className="w-1/3 h-full flex flex-col justify-start bg-[#0b0b0b] opacity-95 absolute top-[101px] right-0 p-8 gap-6 border-l-2 border-l-[#4b4b4b]">
      <div className="w-full flex items-center justify-between text-white text-4xl font-semibold">
        <p>Reward</p>
        <div className="flex items-center gap-1">
          <p>70</p>
          <p className="text-[#ecaa00]">XP</p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center gap-6">
        <div className="w-full h-4/5 rounded-lg border-2 border-[#4b4b4b] relative flex flex-col items-center justify-end pb-4">
          <img className="h-full" src="images/user-avatar.png" />
          <button className="w-4/5 bg-[#a08cff] text-black text-xl font-bold rounded-full py-4 text-center">
            Claim Reward
          </button>
        </div>
        <button className="w-full h-fit px-8 py-2 rounded-full ring-1 ring-[#4b4b4b] text-[#4b4b4b]">
          Complete the quest to check if you are eligible for gasless Claim.
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
