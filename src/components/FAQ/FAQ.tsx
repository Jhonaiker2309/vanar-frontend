import { QAndA } from '../../utils/faq';
import { Accordion } from '../Accordion/Accordion';

export const FAQ = () => {
  return (
    <div className="w-full flex flex-col gap-8 bg-black">
      <Header />
      <div className="w-full flex flex-col bg-black px-8 md:px-20 gap-12 pb-8">
        {QAndA.map((section, index) => (
          <Question key={`question-${index}`} index={index} {...section} />
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full relative flex justify-center items-center">
      <div className="absolute w-full h-full bg-black opacity-85 z-40" />
      <img src="/images/background-faq.svg" />
      <h1 className="text-2xl md:text-[56px] text-white z-50 absolute">
        Frequently Asked Questions
      </h1>
    </div>
  );
};

const Question = ({ index, question, answer }: QuestionProps) => {
  return (
    <div className="w-full text-white flex flex-col items-start gap-2">
      <Accordion
        title={
          <h1 className="text-lg md:text-3xl">
            {index + 1}. {question}
          </h1>
        }
      >
        <p className="text-base md:text-lg">{answer}</p>
      </Accordion>
    </div>
  );
};

interface QuestionProps {
  index: number;
  question: string;
  answer: string;
}
