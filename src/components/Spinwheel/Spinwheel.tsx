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
        className="absolute -mt-[70px]"
        ref={spinnerRef}
      />
      <img
        src="/images/V2/spinwheel-logos.svg"
        alt="placeholder"
        className="absolute top-[175px]"
        ref={spinnerRef2}
      />
      <img src="/images/V2/icon-polygon.svg" alt="placeholder" className="absolute top-[140px]" />
      <button
        className="-mt-[75px] ml-[6px] absolute rounded-full spin-button w-[120px] aspect-square"
        onClick={handleSpinWheelLogic}
      >
        <p className="text-white text-[26px] font-bold uppercase light-text">Spin Now</p>
      </button>
    </div>
  );
};

export default Spinwheel;
