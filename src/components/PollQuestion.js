import { useState, useEffect } from 'react';

export const PollQuestion = ({
  number,
  questionNumber,
  weekNumber,
  questionText,
  answers,
  updateAnswers,
}) => {
  const [answer, setAnswer] = useState({
    questionNumber: '',
    weekNumber: '',
    category: 'poll',
    answer: '',
  });

  useEffect(() => {
    if (answer.answer !== '') {
      updateAnswers(answer);
    }
  }, [answer, updateAnswers]);

  const handleChange = (weekNumber, questionNumber, choice) => {
    setAnswer((prevState) => ({
      ...prevState,
      weekNumber,
      questionNumber,
      category: 'poll',
      answer: choice,
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
                  handleChange(weekNumber, questionNumber.toString(), choice)
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
