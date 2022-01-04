import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { quizData, pollData } from '../data';

const db = getFirestore();

export const AddData = () => {
  const [status, setStatus] = useState({
    quizzes: false,
    polls: false,
  });

  const quizRef = collection(db, 'quizzes');
  const pollRef = collection(db, 'polls');

  const addToDatabase = async (dataSet, ref, type) => {
    for (const data of dataSet) {
      try {
        await addDoc(ref, data);
        console.log('addition successful');
      } catch (error) {
        console.log(error.message);
      }
    }
    setStatus({ ...status, [type]: true });
  };

  const handleClick = () => {
    addToDatabase(quizData, quizRef, 'quizzes');
    addToDatabase(pollData, pollRef, 'polls');
  };

  return (
    <div>
      <h1>Add Data</h1>
      {status.quizzes ? 'Quizzes added' : 'Quizzes in process...'}
      {<br />}
      {status.polls ? 'Polls added' : 'Polls in process...'}
      {<br />}
      <button onClick={handleClick}>Add Data</button>
    </div>
  );
};
