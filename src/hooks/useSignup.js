import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  const signupUser = async (signupObject) => {
    setError(null);
    setIsPending(true);

    const {
      email,
      password,
      firstName,
      lastName,
      studentClass,
      major,
      meetingDay,
    } = signupObject;

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!credential) {
        throw new Error('User not created');
      } else {
        if (!isCancelled) {
          setError(null);
          setIsPending(false);
        }

        const userUid = credential.user.uid;

        try {
          await setDoc(doc(db, 'users', userUid), {
            firstName,
            lastName,
            studentClass,
            major,
            meetingDay,
          });

          if (!isCancelled) {
            setError(null);
            setIsPending(false);
          }
        } catch (err) {
          if (!isCancelled) {
            setError(err.message);
            setIsPending(false);
          }
        }
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  });

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return { signupUser, error, isPending };
};
