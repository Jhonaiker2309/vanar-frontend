const SideImage = () => {
  return (
    <div className="w-1/3 h-full flex flex-col justify-start bg-black fixed top-[101px] right-0 p-8 gap-6">
      <div className="w-4/5 h-4/5 rounded-3xl border-[1px] text-white border-[#f6f6f6] relative flex flex-col items-center justify-end pb-4 gap-1">
        <img className="" src="images/user-avatar.svg" />
        <p className="text-2xl">Virtuans NFT</p>
        <p className="text-lg">70XP</p>
        <button className="w-4/5 bg-[#A08CFF] text-black text-lg font-bold rounded-full py-4 text-center">
          Claim Reward
        </button>
      </div>
    </div>
  );
};

export default SideImage;
