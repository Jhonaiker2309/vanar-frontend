const Ranking = ({ top }: RankingProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-8 text-white">
      <h1 className="text-[28px] md:text-[44px] font-semibold">Top VP earned</h1>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center text-[18px] md:text-[24px] font-semibold gap-8">
          <div className="w-1/6 flex justify-center font-semibold">Rank</div>
          <div className="w-full flex justify-start">Account</div>
          <p className="w-1/6 text-nowrap">Total VP</p>
        </div>
        {top.map((player, index) => {
          const { address, earnedVP } = player;
          return (
            <div
              key={`top-player-${index + 1}`}
              className="w-full flex justify-between items-center text-[16px] md:text-[18px] font-semibold gap-8 py-2"
            >
              <div className="w-1/6 flex items-center justify-center">
                {index === 0 ? (
                  <img className="w-14" src="/public/images/medal-gold.svg" />
                ) : index === 1 ? (
                  <img className="w-14" src="/public/images/medal-silver.svg" />
                ) : index === 2 ? (
                  <img className="w-14" src="/public/images/medal-bronze.svg" />
                ) : (
                  <p className=" text-3xl">{index + 1}</p>
                )}
              </div>
              <div className="w-full flex justify-start">
                <p>{address}</p>
              </div>
              <div className="w-1/6 flex justify-center items-center">{earnedVP}VP</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface RankingProps {
  top: { address: string; earnedVP: number }[];
}

export default Ranking;
