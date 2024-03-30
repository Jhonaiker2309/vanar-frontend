import axios from 'axios';

export const handleClickTask = async (
  account: string | null,
  setIsCompleted: (value: boolean) => void,
  externalEndpoint: boolean,
  link?: string,
  isTwitterAPITask?: boolean,
  completed?: boolean
) => {
  try {

    if(isTwitterAPITask && !account){
      window.open(link, '_blank');
    }
    else if (isTwitterAPITask && account) {
      const twitterUsername = localStorage.getItem('twitterUsername');

      if(completed){
        window.open(link, '_blank');
      } 
      else if (!twitterUsername) {
        const response = await axios.get(import.meta.env.VITE_TWITTER_ENDPOINT);
        const url = response.data.auth_url;
        window.location.href = url;
      } else {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/addTweetsToAccount?wallet=${encodeURIComponent(
            account,
          )}&twitterUsername=${encodeURIComponent(twitterUsername)}`,
        );
        location.reload();
      }
      return;
    } else if (!externalEndpoint) {
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
    } else {
      window.open(link, '_blank');
    }
  } catch (error) {
    console.error('Error visiting link:', error);
    throw error;
  }
};
