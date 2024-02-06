const WeekCard = ({value}) => {
    return (
        <div className="max-w-sm text-white rounded overflow-hidden shadow-lg bg-zinc-800 py-2 px-3">
            <div className="px-6 py-4">
                Icon
            </div>
            <div className="px-2 py-4 text-white text-sm text-center">
                Week 0{value}
            </div>            
            <button className="bg-purple-500 text-white text-sm  rounded cursor-auto">
                Completed
            </button>
        </div>
    );
};
  
export default WeekCard;