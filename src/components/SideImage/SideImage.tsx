const SideImage = () => {
  return (
    <div className="w-full md:w-1/3 h-full flex flex-col justify-center md:justify-start items-center bg-black opacity-90 md:fixed md:top-[101px] md:right-0 p-8 gap-6">
      <div className="w-4/5 md:h-4/5 rounded-3xl border-[1px] text-white border-[#f6f6f6] relative flex flex-col items-center justify-end pt-8 md:pt-0  pb-4 gap-1">
        <img className="w-1/2 md:w-auto" src="images/user-avatar.svg" />
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
