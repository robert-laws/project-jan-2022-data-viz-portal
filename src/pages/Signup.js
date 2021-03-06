import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '../components';
import { useSignup } from '../hooks/useSignup';
import { studentClasses, studentMajors } from '../data';
import { useUserContext } from '../hooks/useUserContext';

export const Signup = () => {
  const { clearProfile } = useUserContext();

  const { signupUser, signupError, isSignupPending } = useSignup();

  const [signup, setSignup] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    studentClass: '',
    studentMajor: '',
    meetingDay: '',
    quiz: [false, false, false, false, false],
    poll: [false, false, false, false, false],
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  useEffect(() => {
    clearProfile();
  }, [clearProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!signup.studentClass) {
      setFormError('Please select a class');
      return;
    }

    if (!signup.studentMajor) {
      setFormError('Please select a major');
      return;
    }

    if (!signup.meetingDay) {
      setFormError('Please select a meeting day');
      return;
    }

    // console.log(signup);
    signupUser(signup);
  };

  return (
    <section id='main-content' className='section-app-form'>
      <form className='app-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className='form-fields'>
          <div className='fields'>
            <label>
              <span>Email</span>
              <input
                required
                type='email'
                name='email'
                value={signup.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='fields'>
            <label>
              <span>Password</span>
              <input
                required
                minLength={6}
                type='password'
                name='password'
                value={signup.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='fields'>
            <label>
              <span>First Name</span>
              <input
                required
                type='text'
                name='firstName'
                value={signup.firstName}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Last Name</span>
              <input
                required
                type='text'
                name='lastName'
                value={signup.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='fields'>
            <label>
              <span>Your Class</span>
              <Select
                options={studentClasses}
                onChange={(option) =>
                  setSignup({ ...signup, studentClass: option.value })
                }
              />
            </label>

            <label>
              <span>Your Major</span>
              <Select
                options={studentMajors}
                onChange={(option) =>
                  setSignup({ ...signup, studentMajor: option.value })
                }
              />
            </label>

            <label style={{ paddingLeft: '1.5rem' }}>
              <span>Course Meeting Day</span>
              <div className='radio-buttons'>
                <label className='radio'>
                  <input
                    type='radio'
                    name='meetingDay'
                    value='sunday'
                    checked={signup.meetingDay === 'sunday'}
                    onChange={handleChange}
                    className='form-check-input'
                  />
                  <span>Sunday</span>
                </label>
                <label className='radio'>
                  <input
                    type='radio'
                    name='meetingDay'
                    value='wednesday'
                    checked={signup.meetingDay === 'wednesday'}
                    onChange={handleChange}
                    className='form-check-input'
                  />
                  <span>Wednesday</span>
                </label>
              </div>
            </label>
          </div>
        </div>
        <div className='form-submit'>
          <Button isLoading={isSignupPending} styleClass='secondary'>
            Signup
          </Button>
          {formError && <p className='error-text'>{formError}</p>}
          {signupError && <p className='error-text'>{signupError}</p>}
        </div>
      </form>
    </section>
  );
};
