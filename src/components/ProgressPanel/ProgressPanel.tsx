import WeekCard from "../WeekCard/WeekCard";

const ProgressPanel = () => {
    return (
      <div>
        <p className="text-white">19th Feb 2024 - 19th Apr 2024</p>
        <div className="flex justify-between mb-4">
            <h1 className="text-white text-6xl font-semibold">Velocity</h1>
            <button className="bg-black text-white text-sm px-6 py-0 border rounded-full opacity-80 h-10">
                Share
            </button>            
        </div>
        <div className="bg-zinc-900	grid grid-cols-7 gap-x-2 px-1 py-2">
         {
          [1,2,3,4,5,6,7].map((value, i) => (
            <div key={i}>
              <WeekCard value={value} />
              <div className="h-4 bg-blue-500 mt-4"></div>
            </div>
          ))
         }
        </div>
      </div>
    );
  };
  
  export default ProgressPanel;