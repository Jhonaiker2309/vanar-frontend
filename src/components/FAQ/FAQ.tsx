const FAQ = () => {
  return (
    <div className="w-full flex flex-col gap-8 bg-black">
      <div className="w-full relative flex justify-center items-center">
        <div className="absolute w-full h-full bg-black opacity-85 z-40" />
        <img src="/images/background-faq.svg" />
        <h1 className=" text-2xl md:text-[56px] text-white z-50 absolute">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="w-full h-[60vh] flex flex-col bg-black px-8  md:px-20 gap-12 overflow-scroll">
        <CreateQuestion />
      </div>
    </div>
  );
};

const CreateQuestion = () => {
  return QAndA.map((section, index) => {
    const { question, answer } = section;
    return (
      <div
        key={`question-${question}`}
        className="w-full text-white flex flex-col items-start gap-2"
      >
        <h1 className="text-lg md:text-3xl">
          {index + 1 + '.'} {question}
        </h1>
        <p className="text-base md:text-lg">{answer}</p>
      </div>
    );
  });
};

const QAndA = [
  {
    question: "What is Vanry technology DMCC's policy?",
    answer:
      'Vanry Technology DMCC provides blockchain services, and related Internet services (collectively, the “Service(s)”). The Service is operated by Vanry Technology DMCC (the “Company”, “we” or “us”) for users of the Service (“you/user”). The Company respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from and tell you about your privacy rights and how the law protects you, with no requirement that you have used the Service(s). This privacy policy is provided in a layered format so you can click through to the specific areas set out below.',
  },
  {
    question: "What is Vanry technology DMCC's policy 2?",
    answer:
      'Vanry Technology DMCC provides blockchain services, and related Internet services (collectively, the “Service(s)”). The Service is operated by Vanry Technology DMCC (the “Company”, “we” or “us”) for users of the Service (“you/user”). The Company respects your privacy and is committed to protecting your personal data.',
  },
  {
    question: "What is Vanry technology DMCC's policy 3?",
    answer:
      'Vanry Technology DMCC provides blockchain services, and related Internet services (collectively, the “Service(s)”). The Service is operated by Vanry Technology DMCC (the “Company”, “we” or “us”) for users of the Service (“you/user”). The Company respects your privacy and is committed to protecting your personal data. ',
  },
];

export default FAQ;
