import { twMerge } from 'tailwind-merge';

export const Bar = ({ percent, rounded = true, className }: BarProps) => {
  return (
    <div className={twMerge('w-full bg-[#4b4b4b] h-3', rounded ? 'rounded-lg' : 'rounded-none')}>
      <div
        data-testid="bars-test-id"
        className={twMerge(
          `bg-gradient-to-r from-[#A08CFF] to-[#8a2be2] h-3 rounded-lg max-w-full`,
          className,
        )}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

interface BarProps {
  percent: number;
  className?: string;
  rounded?: boolean;
}
