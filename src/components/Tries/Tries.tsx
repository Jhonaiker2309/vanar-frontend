import React from 'react';
import { Bar } from '../Bar/BarV2';

const Tries = () => {
  return (
    <div className="w-full flex flex-col items-center bg-[#03D9AF0F] rounded-2xl py-4 px-8 gap-2">
      <div className="w-full flex items-center justify-between">
        <p className="text-white font-semibold">3 Spins / Day</p>
        <p className="text-[#ADADAD]">3 tries Left</p>
      </div>
      <Bar percent={1} />
    </div>
  );
};

export default Tries;
