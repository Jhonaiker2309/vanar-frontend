export const shareCurrentPage = () => {
  const currentURL = encodeURI(document.location.href);
  navigator.share({
    title: 'Welcome to Foundation phase for Vanguard',
    text: 'Hurry to join in the greatest Valorant tournament of all time. Fight till the end and get the reward.',
    url: currentURL,
  });
};
