import { useReducer, useCallback } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import {
  LOAD_QUESTIONS,
  LOAD_RESULTS,
  QUESTIONS_ERROR,
  RESULTS_ERROR,
  SAVING_COMPLETE,
  SAVING_ERROR,
  CLEAR_QUESTIONS,
  CLEAR_RESULTS,
  RESET_IS_SAVING,
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

  const loadQuestions = useCallback(
    async (category, weekNumber) => {
      const colRef = collection(db, 'questions');
      const q = query(
        colRef,
        where('category', '==', category),
        where('weekNumber', '==', parseInt(weekNumber))
      );

      try {
        const querySnapshot = await getDocs(q);
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
    },
    [dispatch]
  );

  const loadResults = useCallback(
    async (userId, category = 'quiz') => {
      const colRef = collection(db, 'results');
      const q = query(
        colRef,
        where('userId', '==', userId),
        where('category', '==', category)
      );

      try {
        const querySnapshot = await getDocs(q);
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
          console.log('db query...');
        }
      } catch (error) {
        dispatch({
          type: RESULTS_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

  const loadResultsForCategoryAndWeekNumber = useCallback(
    async (userId, category, weekNumber) => {
      const colRef = collection(db, 'results');
      const q = query(
        colRef,
        where('userId', '==', userId),
        where('category', '==', category),
        where('weekNumber', '==', parseInt(weekNumber))
      );

      try {
        const querySnapshot = await getDocs(q);
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
          console.log('db query...');
        }
      } catch (error) {
        dispatch({
          type: RESULTS_ERROR,
          payload: `Database Error: ${error.message}`,
        });
      }
    },
    [dispatch]
  );

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

  const clearQuestions = useCallback(() => {
    dispatch({ type: CLEAR_QUESTIONS });
  }, [dispatch]);

  const clearResults = useCallback(() => {
    dispatch({ type: CLEAR_RESULTS });
  }, [dispatch]);

  const resetIsSaving = useCallback(() => {
    dispatch({ type: RESET_IS_SAVING });
  }, [dispatch]);

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
        loadResultsForCategoryAndWeekNumber,
        saveResults,
        clearQuestions,
        clearResults,
        resetIsSaving,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
