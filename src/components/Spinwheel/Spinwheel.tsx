interface SpinwheelProps {
  spinnerRef: React.RefObject<HTMLImageElement>;
  spinnerRef2: React.RefObject<HTMLImageElement>;
  handleSpinWheelLogic: () => void;
}

const Spinwheel = ({ spinnerRef, spinnerRef2, handleSpinWheelLogic }: SpinwheelProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src="/images/V2/spinwheel-center.svg"
        alt="spinner"
        className="md:-mt-[70px] min-w-[580px] md:min-w-[600px] lg:w-full"
        ref={spinnerRef}
      />

      <img
        src="/images/V2/spinwheel-logos.svg"
        alt="placeholder"
        className="absolute w-[310px] md:w-[310px] md:top-[75px]"
        ref={spinnerRef2}
      />
      <img
        src="/images/V2/icon-polygon.svg"
        alt="placeholder"
        className="absolute top-[110px] md:top-[140px] w-[50px] md:w-inherit lg:top-10"
      />
      <button
        className="md:-mt-[75px] ml-[6px] absolute rounded-full spin-button w-[80px] md:w-[120px] aspect-square"
        onClick={handleSpinWheelLogic}
      >
        <p className="text-white text-base md:text-[26px] font-bold uppercase light-text">
          Spin Now
        </p>
      </button>
    </div>
  );
};

export default Spinwheel;
