import { useReducer, useCallback } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { LOAD_QUESTIONS, QUESTIONS_ERROR } from '../types';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';

const db = getFirestore();

const QuestionState = ({ children }) => {
  const initialState = {
    questions: null,
    isQuestionsLoading: true,
    questionsError: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initialState);

  const loadQuestions = useCallback(async () => {
    const colRef = collection(db, 'questions');

    try {
      const querySnapshot = await getDocs(colRef);
      console.log('request made...');
      if (querySnapshot.empty) {
        dispatch({ type: QUESTIONS_ERROR, payload: 'No documents found' });
      } else {
        let allQuestions = [];
        querySnapshot.forEach((doc) => {
          allQuestions.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: LOAD_QUESTIONS, payload: allQuestions });
      }
    } catch (error) {
      dispatch({
        type: QUESTIONS_ERROR,
        payload: `Database Error: ${error.message}`,
      });
    }
  }, [dispatch]);

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        isQuestionsLoading: state.isQuestionsLoading,
        questionsError: state.questionsError,
        loadQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
