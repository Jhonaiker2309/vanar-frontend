import axios from 'axios';

export const fetchData = async (
  account: string | null,
  setMainSectionData: (value: MainSectionData) => void,
  setNftVideo: (value: NftData) => void,
) => {
  /*const apiUrl = account
    ? `https://vanar-backend.vercel.app/getData/${account}`
    : 'https://vanar-backend.vercel.app/getData';*/

  const apiUrl = account
    ? `http://localhost:5000/getData/${account}`
    : 'http://localhost:5000/getData';    

  try {
    const response = await axios.get(apiUrl);
    const { numberOfWeeks, currentWeekData, finished, totalData, currentVideo, currentNFT } =
      response.data;

    const mainData = {
      totalWeeks: numberOfWeeks,
      currentWeek: currentWeekData.week,
      currentStatus: currentWeekData.status,
      isFinished: finished,
      tasks: currentWeekData.tasks,
      eventPhases: totalData,
    };
    setMainSectionData(mainData);

    const nftData = {
      video: currentVideo,
      name: currentNFT.name,
      experienceNeeded: currentNFT.experienceNeeded,
    };
    setNftVideo(nftData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

// INTERFACES
export interface MainSectionData {
  totalWeeks: number;
  currentWeek: number;
  currentStatus: string;
  isFinished?: boolean;
  tasks: Task[];
  eventPhases: EventPhase[];
}

export interface NftData {
  video: string;
  name: string;
  experienceNeeded: number;
}

export interface EventPhase {
  phase: number;
  tasks: Task[];
  week: number;
  status: string;
}

export interface Task {
  completed: boolean;
  experience: number;
  link?: string;
  logo: string;
  text: string;
  isBonus?: boolean;
}

export interface Week {
  week: number;
  status: string;
  tasks: Task[];
  phase: number;
}
