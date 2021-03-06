import { useState, useEffect } from 'react';

export const QuizQuestion = ({
  number,
  error,
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
    category: 'quiz',
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
      category: 'quiz',
      questionNumber,
      answer: choice,
      correct: checkAnswer,
    }));
  };

  return (
    <div
      className='app-form'
      style={{
        borderColor: error ? 'red' : '#CCC',
        borderWidth: error ? '2px' : '1px',
      }}
    >
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
    </div>
  );
};
