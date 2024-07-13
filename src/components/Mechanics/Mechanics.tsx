import { Hint } from '../Hint/Hint';

interface MechanicsProps {
  spined: number;
}
const Mechanics = ({ spined }: MechanicsProps) => {
  return (
    <div className="w-full 2xl:w-[320px] p-4 flex flex-col items-center justify-center gap-4 border-[1px] bg-[#030605dd] xl:bg-transparent border-[#F6F6F60A] rounded-2xl">
      <h1 className="text-[26px] text-center text-white font-semibold text-nowrap">
        Spin Mechanics
      </h1>
      <div className="w-full flex flex-col items-center bg-[#03D9AF0F] rounded-2xl py-4 px-4 gap-8">
        <div className="w-full flex items-center justify-between">
          <p className="text-white">1st Spin</p>
          {spined >= 1 ? (
            <div className="flex items-center gap-2">
              <img src="images/V2/icon-check.svg" alt="check icon" />
              <p className="text-[#FFA500] font-semibold">Used</p>
            </div>
          ) : (
            <p className="text-[#03D9AF] font-semibold">20 VP</p>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-white">2nd Spin</p>
          {spined >= 2 ? (
            <div className="flex items-center gap-2">
              <img src="images/V2/icon-check.svg" alt="check icon" />
              <p className="text-[#FFA500] font-semibold">Used</p>
            </div>
          ) : (
            <p className="text-[#03D9AF] font-semibold">20 VP</p>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-white">3rd Spin</p>
          {spined >= 3 ? (
            <div className="flex items-center gap-2">
              <img src="images/V2/icon-check.svg" alt="check icon" />
              <p className="text-[#FFA500] font-semibold">Used</p>
            </div>
          ) : (
            <p className="text-[#03D9AF] font-semibold">20 VP</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-[#03D9AF0F] rounded-2xl py-4 px-4 gap-8">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-white">4th Spin</p>
            {spined >= 3 ? (
              <span className="capitalize text-[#F0F000] text-xs md:text-base xl:text-xs 2xl:text-base">
                (Bonus spin)
              </span>
            ) : (
              <Hint hint='To use the "Spin 4" option, you need to spend 40 (Double) VP Points.' />
            )}
          </div>
          {spined === 3 ? (
            <div className="flex items-center gap-2">
              <p className="text-[#03D9AF] font-semibold">40 VP</p>
            </div>
          ) : spined >= 4 ? (
            <div className="flex items-center md:gap-2">
              <img src="images/V2/icon-check.svg" alt="check icon" />
              <p className="text-[#FFA500] font-semibold">Used</p>
            </div>
          ) : (
            <div className="md:w-[140px] px-2 md:px-0 text-center bg-[#F0F000] rounded-md py-1">
              <p className="text-[#06080C] font-bold text-xs md:text-base">BONUS SPIN</p>
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-white">5th Spin</p>
            {spined >= 4 ? (
              <span className="capitalize text-[#F0F000] text-xs md:text-base xl:text-xs 2xl:text-base">
                (Social bonus)
              </span>
            ) : (
              <Hint hint="This option will be available when you share your winning moment or achievement on Twitter." />
            )}
          </div>
          {spined === 4 ? (
            <div className="flex items-center py-2 px-4 bg-[#014135] gap-2 rounded-md">
              <p className="text-[#03D9AF] font-semibold">Active</p>
            </div>
          ) : spined >= 5 ? (
            <div className="flex items-center md:gap-2">
              <img src="images/V2/icon-check.svg" alt="check icon" />
              <p className="text-[#FFA500] font-semibold">Used</p>
            </div>
          ) : (
            <div className="md:w-[140px] px-2 md:px-0 text-center bg-[#F0F000] rounded-md py-1">
              <p className="text-[#06080C] font-bold text-xs md:text-base">SOCIAL BONUS</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mechanics;
