import { Accordion } from '../Accordion/AccordionV2';

export const FAQ = () => {
  return (
    <div className="w-full h-full pt-20 flex flex-col items-center gap-8 ">
      <h1 className="text-center md:text-left text-[34px] font-bold">Frequently Ask Questions</h1>
      <div className="w-full h-3/5 pb-8 flex flex-col gap-4 overflow-scroll z-50">
        {FAQs.map((section, index) => (
          <Question key={`question-${index}`} index={index} {...section} />
        ))}
      </div>
    </div>
  );
};

const Question = ({ question, answer }: QuestionProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-2 px-8">
      <Accordion title={<h1 className="text-[22px] font-semibold">{question}</h1>}>
        <p className="text-[#2b2b2b] md:text-lg">{answer}</p>
      </Accordion>
    </div>
  );
};

interface QuestionProps {
  index: number;
  question: string;
  answer: string;
}

const FAQs = [
  {
    question: 'What is Velocity?',
    answer:
      "The VELOCITY Campaign is an immersive testnet experience on the Vanar Chain, starting with foundational knowledge and expanding into areas like DeFi, NFTs, and gaming. It combines learning with action through phases quests and challenges, offering rewards for participation and engagement. This initiative aims to deepen users' blockchain understanding while fostering innovation within the Vanar ecosystem.",
  },
  {
    question: 'What is VP?',
    answer:
      'VP is velocity points, partake in tasks and bonus tasks to rank up in the leader boards and for the chance to win goodies across select campaigns.',
  },
  {
    question: 'How do I get the NFT for each phase?',
    answer:
      'By completing all the tasks for the phase you become eligible for minting the NFT for the specific phases. Once the phase is over the NFT will no longer be mintable. ',
  },
];
