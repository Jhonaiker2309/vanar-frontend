import axios from 'axios';

export const handleClickTask = async (
  account: string | null,
  setIsCompleted: (value: boolean) => void,
  externalEndpoint: boolean,
  link?: string,
) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/visitLink`, {
      account: account,
      link: link,
    });

    if (response.status === 200) {
      window.open(link, '_blank');

      if (!externalEndpoint && account) {
        setIsCompleted(true);
      }
    } else {
      throw new Error('Failed to visit link');
    }
  } catch (error) {
    console.error('Error visiting link:', error);
    throw error;
  }
};
