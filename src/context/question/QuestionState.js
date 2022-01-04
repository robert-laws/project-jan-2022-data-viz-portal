import { useReducer, useCallback } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import {
  LOAD_QUESTIONS,
  QUESTIONS_ERROR,
  SAVING_COMPLETE,
  SAVING_ERROR,
} from '../types';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';

const db = getFirestore();

const QuestionState = ({ children }) => {
  const initialState = {
    questions: null,
    isQuestionsLoading: true,
    questionsError: null,
    isSaving: true,
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

  const saveResults = useCallback(
    async (answers) => {
      const colRef = collection(db, 'results');

      try {
        for (let i = 0; i < answers.length; i++) {
          await addDoc(colRef, answers[i]);
        }
        dispatch({ type: SAVING_COMPLETE });
      } catch (error) {
        dispatch({
          type: SAVING_ERROR,
          payload: `Could not add the documents because: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        isQuestionsLoading: state.isQuestionsLoading,
        questionsError: state.questionsError,
        isSaving: state.isSaving,
        loadQuestions,
        saveResults,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
