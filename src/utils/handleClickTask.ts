import axios from 'axios';

export const handleClickTask = async (
  account: string | null,
  setIsCompleted: (value: boolean) => void,
  link?: string,
) => {
  try {
    const response = await axios.post('https://vanar-backend.vercel.app/visitLink', {
      account: account,
      link: link,
    });

    if (response.status === 200) {
      window.open(link, '_blank');
      setIsCompleted(true);
    } else {
      throw new Error('Failed to visit link');
    }
  } catch (error) {
    console.error('Error visiting link:', error);
    throw error;
  }
};
