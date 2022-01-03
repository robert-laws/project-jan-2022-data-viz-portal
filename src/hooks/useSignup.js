import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isSignupPending, setIsSignupPending] = useState(false);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  const signupUser = async (signupObject) => {
    setSignupError(null);
    setIsSignupPending(true);

    const {
      email,
      password,
      firstName,
      lastName,
      studentClass,
      studentMajor,
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
          setSignupError(null);
          setIsSignupPending(false);
        }

        const userUid = credential.user.uid;

        try {
          await setDoc(doc(db, 'users', userUid), {
            firstName,
            lastName,
            studentClass,
            studentMajor,
            meetingDay,
          });

          if (!isCancelled) {
            setSignupError(null);
            setIsSignupPending(false);
          }
        } catch (err) {
          if (!isCancelled) {
            setSignupError(err.message);
            setIsSignupPending(false);
          }
        }
      }
    } catch (err) {
      if (!isCancelled) {
        setSignupError(err.message);
        setIsSignupPending(false);
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

  return { signupUser, signupError, isSignupPending };
};
