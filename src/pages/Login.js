import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Button } from '../components';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loginError, isLoginPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className='section-app-form'>
      <form className='app-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-fields'>
          <div className='fields'>
            <label>
              <span>email</span>
              <input
                required
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className='fields'>
            <label>
              <span>password</span>
              <input
                required
                minLength={6}
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className='form-submit'>
          <Button isLoading={isLoginPending} styleClass='secondary'>
            Login
          </Button>
          {loginError && <p className='error-text'>{loginError}</p>}
        </div>
      </form>
    </section>
  );
};
