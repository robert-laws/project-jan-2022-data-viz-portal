import {
  LOAD_QUESTIONS,
  LOAD_RESULTS,
  QUESTIONS_ERROR,
  RESULTS_ERROR,
  SAVING_ERROR,
  SAVING_COMPLETE,
} from '../types';

const questionReducer = (state, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        questionsError: null,
        isQuestionsLoading: false,
      };

    case LOAD_RESULTS: {
      return {
        ...state,
        results: action.payload,
        resultsError: null,
        isResultsLoading: false,
      };
    }

    case QUESTIONS_ERROR:
      return {
        ...state,
        questionsError: action.payload,
        isQuestionsLoading: false,
        isSaving: true,
      };

    case RESULTS_ERROR:
      return {
        ...state,
        resultsError: action.payload,
        isResultsLoading: false,
        isSaving: true,
      };

    case SAVING_COMPLETE:
      return {
        ...state,
        isSaving: false,
      };

    case SAVING_ERROR:
      return {
        ...state,
        questionsError: action.payload,
        isQuestionsLoading: false,
      };

    default:
      return state;
  }
};

export default questionReducer;
