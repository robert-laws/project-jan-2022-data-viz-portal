import { useReducer, useCallback } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import {
  LOAD_QUESTIONS,
  LOAD_RESULTS,
  QUESTIONS_ERROR,
  RESULTS_ERROR,
  SAVING_COMPLETE,
  SAVING_ERROR,
} from '../types';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';

const db = getFirestore();

const QuestionState = ({ children }) => {
  const initialState = {
    questions: null,
    results: null,
    isQuestionsLoading: true,
    isResultsLoading: true,
    questionsError: null,
    resultsError: null,
    isSaving: true,
  };

  const [state, dispatch] = useReducer(questionReducer, initialState);

  const loadQuestions = useCallback(async () => {
    const colRef = collection(db, 'questions');

    try {
      const querySnapshot = await getDocs(colRef);
      if (querySnapshot.empty) {
        dispatch({
          type: QUESTIONS_ERROR,
          payload: 'No question documents found',
        });
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

  const loadResults = useCallback(async () => {
    const colRef = collection(db, 'results');

    try {
      const querySnapshot = await getDocs(colRef);
      if (querySnapshot.empty) {
        dispatch({
          type: RESULTS_ERROR,
          payload: 'No results documents found',
        });
      } else {
        let allResults = [];
        querySnapshot.forEach((doc) => {
          allResults.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: LOAD_RESULTS, payload: allResults });
      }
    } catch (error) {
      dispatch({
        type: RESULTS_ERROR,
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
        results: state.results,
        isQuestionsLoading: state.isQuestionsLoading,
        isResultsLoading: state.isResultsLoading,
        questionsError: state.questionsError,
        resultsError: state.resultsError,
        isSaving: state.isSaving,
        loadQuestions,
        loadResults,
        saveResults,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
