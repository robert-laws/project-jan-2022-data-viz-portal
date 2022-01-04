import { useContext } from 'react';
import QuestionContext from '../context/question/questionContext';

export const useQuestionContext = () => {
  const questionContext = useContext(QuestionContext);

  if (!questionContext) {
    throw new Error(
      'useQuestionContext must be used within an QuestionProvider'
    );
  }

  return questionContext;
};
