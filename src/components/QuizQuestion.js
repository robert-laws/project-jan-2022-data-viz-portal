import { useState, useEffect } from 'react';

export const QuizQuestion = ({
  number,
  questionNumber,
  weekNumber,
  questionText,
  answers,
  correctAnswer,
  updateAnswers,
}) => {
  const [answer, setAnswer] = useState({
    questionNumber: '',
    weekNumber: '',
    answer: '',
    correct: false,
  });

  useEffect(() => {
    if (answer.answer !== '') {
      updateAnswers(answer);
    }
  }, [answer, updateAnswers]);

  const handleChange = (weekNumber, questionNumber, choice, correctAnswer) => {
    const checkAnswer = choice === correctAnswer;

    setAnswer((prevState) => ({
      ...prevState,
      weekNumber,
      questionNumber,
      answer: choice,
      correct: checkAnswer,
    }));
  };

  return (
    <div className='app-form'>
      <p>
        <strong>Question #{number}</strong>
      </p>
      <label className='radio-group'>
        <span>{questionText}</span>
        <div className='radio-buttons'>
          {answers.map((choice) => (
            <label key={choice} className='radio'>
              <input
                type='radio'
                name={`question${number}`}
                value={choice}
                className='form-check-input'
                onChange={() =>
                  handleChange(
                    weekNumber,
                    questionNumber.toString(),
                    choice,
                    correctAnswer
                  )
                }
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </label>
      {/* 
      <label className='radio-group'>
        <span>{questionText}</span>
        <div className='radio-buttons'>
          {questionAnswers.map((choice) => (
            <label key={choice} className='radio'>
              <input
                type='radio'
                name={`question${questionNumber.toString()}`}
                value={choice}
                className='form-check-input'
                onChange={() =>
                  handleChange(
                    weekNumber,
                    questionNumber.toString(),
                    choice,
                    correctAnswer
                  )
                }
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </label> */}
    </div>
  );
};
