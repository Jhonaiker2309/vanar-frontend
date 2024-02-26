export const ShareMenu = () => {
  return (
    <div className="w-fit flex flex-col p-8 bg-[#fcfcfc] border-2 border-[#101010] rounded-xl gap-8">
      <p className="text-2xl text-[#101010] font-bold text-nowrap">Share on socials</p>
      <p className="text-[#101010] text-nowrap">
        If you don’t have a wallet yet, you can select a provider and create one now.
      </p>
      <div className="flex justify-between items-end">
        {ShareOptions.map(option => {
          const { serviceName, icon, action, url } = option;
          return (
            <div
              key={`option-${serviceName}`}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => (action ? action() : window.open(url, '_blank'))}
            >
              <img src={`/images/${icon}.svg`} />
              <p>{serviceName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const currentURL = encodeURI(document.location.href);
const URLTitle = encodeURI('Welcome to Foundation phase for Vanguard');

const ShareOptions = [
  {
    serviceName: 'Copy URL',
    icon: 'embed',
    action: () =>
      navigator.clipboard.writeText(currentURL).then(
        () => alert('URL copied to clipboard!'),
        err => console.error('Could not copy text: ', err),
      ),
  },
  {
    serviceName: 'Whatsapp',
    icon: 'whatsapp',
    url: `https://api.whatsapp.com/send?text=${URLTitle} ${currentURL}`,
  },
  {
    serviceName: 'Facebook',
    icon: 'facebook',
    url: `https://www.facebook.com/sharer.php?u=${currentURL}`,
  },
  {
    serviceName: 'Twitter',
    icon: 'twitter',
    url: `https://twitter.com/share?url=${currentURL}&text=${URLTitle}&via=Vanarchain&hashtags=Vanar`,
  },
  {
    serviceName: 'Email',
    icon: 'email',
    url: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${URLTitle}&body=Check%20out%20this%20link:%20${currentURL}`,
  },
];
