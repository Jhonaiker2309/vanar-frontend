import { ReactNode } from 'react';

export const CreatePhase = ({ title, children }: CreatePhraseProps) => {
  return (
    <div className="w-fit md:m-auto lg:m-0 flex flex-col items-center bg-[#0b0b0b] border-2 border-[#101010] rounded-xl py-6 px-3 gap-4">
      <p className="text-xl text-white font-semibold">{title}</p>
      <div className="w-fit flex gap-4 justify-between">{children}</div>
    </div>
  );
};

interface CreatePhraseProps {
  title: string;
  children: ReactNode;
}
