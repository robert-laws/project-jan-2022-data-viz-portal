import {
  LOAD_QUESTIONS,
  LOAD_RESULTS,
  QUESTIONS_ERROR,
  RESULTS_ERROR,
  SAVING_ERROR,
  SAVING_COMPLETE,
  CLEAR_QUESTIONS,
  CLEAR_RESULTS,
  RESET_IS_SAVING,
  LOAD_ALL_POLLS,
  POLLS_ERROR,
  CLEAR_POLLS,
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

    case LOAD_RESULTS:
      return {
        ...state,
        results: action.payload,
        resultsError: null,
        isResultsLoading: false,
      };

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

    case CLEAR_QUESTIONS:
      return {
        ...state,
        questions: null,
        questionsError: null,
        isQuestionsLoading: true,
      };

    case CLEAR_RESULTS:
      return {
        ...state,
        results: null,
        resultsError: null,
        isResultsLoading: true,
      };

    case RESET_IS_SAVING:
      return {
        ...state,
        isSaving: true,
      };

    case LOAD_ALL_POLLS:
      return {
        ...state,
        polls: action.payload,
        pollsError: null,
        isPollsLoading: false,
      };

    case POLLS_ERROR:
      return {
        ...state,
        pollsError: action.payload,
        isPollsLoading: false,
      };

    case CLEAR_POLLS:
      return {
        ...state,
        polls: null,
        pollsError: null,
        isPollsLoading: true,
      };

    default:
      return state;
  }
};

export default questionReducer;
