export const MessageSection = () => {
  return (
    <div className="w-full flex flex-col items-start gap-8 text-white">
      <h1 className="text-[28px] md:text-[44px] font-semibold">
        Welcome to Foundation Week at Vanar Chain Testnet: Vanguard
      </h1>
      <p className="text-sm md:text-lg font-semibold py-2 px-4 bg-[#2b2b2b] rounded-full -mt-6 md:mt-0">
        19th Feb 2024, 02:19 PM - 26th Feb 2024, 04:00 AM
      </p>
      <img
        className="w-full rounded-[40px]"
        src="/images/message-background.jpg"
        alt="week image"
      />
      <p className="text-lg text-[#f6f6f6]">
        Hurry to join in the greatest Valorant tournament of all time. Fight till the end and get
        the reward. Hurry to join in the greatest Valorant tournament of all time. Fight till the
        end and get the rewardHurry to join in the greatest Valorant tournament of all time.
      </p>
    </div>
  );
};
