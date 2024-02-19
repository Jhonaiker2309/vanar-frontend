import { Bar } from '../Bar/Bar';
import { Icon } from '../Icon/Icon';
import { ReactNode } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const ProgressPanel = ({ panelData }: ProgressPanelProps) => {
  const currentURL = encodeURI(document.location.href);
  console.log(panelData);

  const handleMobileShare = () => {
    navigator.share({
      title: 'Welcome to Foundation Week at Vanar Chain Testnet: Vanguard',
      text: 'Hurry to join in the greatest Valorant tournament of all time. Fight till the end and get the reward.',
      url: currentURL,
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center md:items-start">
      <p className="text-lg text-[#A08CFF] font-semibold">19th Feb 2024 - 19th Apr 2024</p>
      <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-16 md:gap-0">
        <img src="/images/title-velocity.svg" />
        <div className="hidden md:flex">
          <DropdownMenu
            icon={
              <div className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex items-center justify-center gap-2">
                <Icon name="share" size={24} color="white" />
                Share
              </div>
            }
            content={<ShareMenu />}
          />
        </div>
        <div
          className="bg-[#0b0b0b] text-white font-bold text-lg px-6 py-6 mb-12 border-[1.5px] border-[#4b4b4b] rounded-full h-10 flex md:hidden items-center justify-center gap-2"
          onClick={handleMobileShare}
        >
          <Icon name="share" size={24} color="white" />
          Share
        </div>
      </div>
      <div className="w-full items-center">
        <div className="flex md:hidden w-full flex-wrap items-center justify-between py-4 gap-4">
          <CreateCard status="In Progress" week={1} isResponsive />
          <CreateCard status="Locked" week={2} isResponsive />
          <CreateCard status="Locked" week={3} isResponsive />
          <CreateCard status="Locked" week={3} isResponsive />
          <CreateCard status="Locked" week={3} isResponsive />
          <CreateCard status="Locked" week={3} isResponsive />
        </div>
        <QuestProgress />
        <div className="hidden md:flex w-full flex-wrap items-center justify-between py-4 gap-4">
          <CreatePhrase title="Phase 1">
            <CreateCard status="In Progress" week={1} />
            <CreateCard status="Locked" week={2} />
          </CreatePhrase>
          <CreatePhrase title="Phase 2">
            <CreateCard status="Locked" week={3} />
            <CreateCard status="Locked" week={3} />
            <CreateCard status="Locked" week={3} />
          </CreatePhrase>
          <CreatePhrase title="Phase 3">
            <CreateCard status="Locked" week={3} />
          </CreatePhrase>
        </div>
      </div>
    </div>
  );
};

export default ProgressPanel;

interface ProgressPanelProps {
  panelData: { totalWeeks: number; currentWeek: number; isFinished: boolean };
}

interface CreatePhraseProps {
  title: string;
  children: ReactNode;
}
interface CreateCardProps {
  status: 'Completed' | 'Locked' | 'In Progress';
  week?: number;
  isFinal?: boolean;
  isResponsive?: boolean;
}

const CreatePhrase = ({ title, children }: CreatePhraseProps) => {
  return (
    <div className="w-fit md:m-auto lg:m-0 flex flex-col items-center bg-[#0b0b0b] border-2 border-[#101010] rounded-xl py-6 px-3 gap-4">
      <p className="text-xl text-white font-semibold">{title}</p>
      <div className="w-fit flex gap-4 justify-between">{children}</div>
    </div>
  );
};

const CreateCard = ({ status, week, isFinal = false, isResponsive = false }: CreateCardProps) => {
  const isInProgress = status === 'In Progress';
  const isCompleted = status === 'Completed';

  return (
    <div className="w-[80px] m-auto  md:w-[125px] py-4 rounded-xl flex flex-col justify-end items-center gap-4 bg-[#1a1a1a] ring-2 ring-[#F6F6F633] ">
      <Icon
        name={isFinal ? 'crown' : 'lock'}
        size={isResponsive ? 16 : 48}
        color={isCompleted ? '#A08CFF' : isInProgress ? '#ecaa00' : ''}
      />
      <div className="flex flex-col justify-end items-center gap-2 text-white text-[10px]  md:text-xs">
        <p>{isFinal ? 'Congrats' : `Week 0${week}`}</p>

        <div
          className={`text-[8px] md:text-base px-3 md:py-1 rounded md:rounded-full text-nowrap  ${
            isCompleted ? 'bg-[#A08CFF]' : isInProgress ? 'bg-[#ecaa00]' : 'bg-[#4b4b4b]'
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

const QuestProgress = () => {
  return (
    <div className="w-full bg-[#0b0b0b] border-2 border-[#101010] rounded-xl mt-0 md:mt-[74px] flex items-center justify-end gap-1 py-4 px-4 md:gap-8 md:p-8">
      <p className="min-w-fit text-base  md:text-xl text-white">Quest Progress</p>
      <Bar percent={0} />
      <Icon name="trophy" size={36} />
    </div>
  );
};

const ShareMenu = () => {
  const currentURL = encodeURI(document.location.href);
  const URLTitle = encodeURI('Welcome to Foundation Week at Vanar Chain Testnet: Vanguard');
  const handleCopyURL = () => {
    navigator.clipboard.writeText(currentURL);
  };

  return (
    <div className="w-fit flex flex-col p-8 bg-[#fcfcfc] border-2 border-[#101010] rounded-xl gap-8">
      <p className="text-2xl text-[#101010] font-bold text-nowrap">Share on socials</p>
      <p className="text-[#101010] text-nowrap">
        If you don’t have a wallet yet, you can select a provider and create one now.
      </p>
      <div className="flex justify-between items-end">
        <div className="flex flex-col items-center cursor-pointer" onClick={handleCopyURL}>
          <img src="/images/embed.svg" />
          <p>Copy URL</p>
        </div>
        <a
          href={`https://api.whatsapp.com/send?text=${URLTitle} ${currentURL}`}
          target="_blank"
          className="flex flex-col items-center cursor-pointer"
        >
          <img src="/images/whatsapp.svg" />
          <p>Whatsapp</p>
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?u=${currentURL}`}
          target="_blank"
          className="flex flex-col items-center cursor-pointer"
        >
          <img src="/images/facebook.svg" />
          <p>Facebook</p>
        </a>
        <a
          href={`https://twitter.com/share?url=${currentURL}&text=${URLTitle}&via=${'Vanarchain'}&hashtags=${'Vanar'}`}
          target="_blank"
          className="flex flex-col items-center cursor-pointer"
        >
          <img src="/images/twitter.svg" />
          <p>Twitter</p>
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${URLTitle}&body=Check%20out%20this%20link:%20${currentURL}`}
          target="_blank"
          className="flex flex-col items-center cursor-pointer"
        >
          <img src="/images/email.svg" />
          <p>Email</p>
        </a>
      </div>
    </div>
  );
};
