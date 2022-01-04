import { Link, NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { Button } from './Button';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navigation = () => {
  const { user } = useAuthContext();
  const { logout, isLogoutPending } = useLogout();

  return (
    <header>
      <div className='app-header'>
        <div className='branding'>
          <h1>
            <Link to='/'>Data Viz Portal</Link>
          </h1>
        </div>
        <nav className='app-navigation short-form'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/knowledge-base'>Knowledge Base</NavLink>
          {!user && <NavLink to='/login'>Login</NavLink>}
          {!user && <NavLink to='/signup'>Signup</NavLink>}
          {user && <NavLink to='/profile'>Profile</NavLink>}
          {user && <NavLink to='/quiz'>Quizzes</NavLink>}
          {user && <NavLink to='/poll'>Polls</NavLink>}
          {user && (
            <Button
              isLoading={isLogoutPending}
              onClick={() => logout()}
              styleClass='primary'
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
