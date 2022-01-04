import { LOAD_QUESTIONS, QUESTIONS_ERROR } from '../types';

const questionReducer = (state, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        questionsError: null,
        isQuestionsLoading: false,
      };

    case QUESTIONS_ERROR:
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
