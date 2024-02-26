export const MessageSection = () => {
  return (
    <div className="w-full flex flex-col items-start gap-8 text-white">
      <h1 className="text-[28px] md:text-[44px] font-semibold">
        Welcome to Foundation week for Vanguard
      </h1>
      <p className="text-sm md:text-lg font-semibold py-2 px-4 bg-[#2b2b2b] rounded-full -mt-6 md:mt-0">
        26th Feb 2024, 12:00 PM - 4th March 2024, 12:00 AM
      </p>
      <img
        className="w-full rounded-[40px] hidden md:flex "
        src="/images/message-background.jpg"
        alt="week image"
      />
      <img
        className="w-full rounded-[40px] md:hidden flex "
        src="/images/message-background-mobile.jpg"
        alt="week image"
      />
    </div>
  );
};
