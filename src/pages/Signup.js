import { useState } from 'react';
import Select from 'react-select';
import { Button } from '../components';
import { studentClasses, studentMajors } from '../data';

export const Signup = () => {
  const [signup, setSignup] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    studentClass: '',
    studentMajor: '',
    meetingDay: '',
  });
  const [formError, setFormError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit event');
  };

  const handleClick = () => {
    setLoading((prev) => !prev);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
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
          </div>
          <div className='fields'>
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
          </div>
          <div className='fields'>
            <label>
              <span>Your Major</span>
              <Select
                options={studentMajors}
                onChange={(option) =>
                  setSignup({ ...signup, studentMajor: option.value })
                }
              />
            </label>
          </div>
          <div className='fields'>
            <label>
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
          <Button
            isLoading={loading}
            onClick={handleClick}
            styleClass='secondary'
          >
            Signup
          </Button>
        </div>
      </form>
    </section>
  );
};
