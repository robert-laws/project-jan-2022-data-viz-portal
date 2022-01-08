import { Link, NavLink } from 'react-router-dom';
import PortalIcon from '../assets/icons/dashboard.svg';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navigation = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <header>
      <div className='app-header'>
        <div className='branding'>
          <Link to='/'>
            <img src={PortalIcon} alt='Data Viz Portal Icon' />
            <h1>Data Viz Portal</h1>
          </Link>
        </div>
        <nav className='app-navigation short-form'>
          {user && <NavLink to='/profile'>Profile</NavLink>}
          <NavLink to='/knowledge-base'>Knowledge Base</NavLink>
          {!user && <NavLink to='/login'>Login</NavLink>}
          {!user && <NavLink to='/signup'>Signup</NavLink>}
          {user && <NavLink to='/dashboard'>Dashboard</NavLink>}
          {user && <NavLink to='/quiz'>Quizzes</NavLink>}
          {user && <NavLink to='/poll'>Polls</NavLink>}
          {user && (
            <div style={{ width: '120px' }}>
              <button
                className='button'
                style={{ width: '100%', height: '40px' }}
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
