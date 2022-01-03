import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginPending, setIsLoginPending] = useState(false);

  const auth = getAuth();

  const login = async (email, password) => {
    setLoginError(null);
    setIsLoginPending(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (!isCancelled) {
        setIsLoginPending(false);
        setLoginError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsLoginPending(false);
        setLoginError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, loginError, isLoginPending };
};
