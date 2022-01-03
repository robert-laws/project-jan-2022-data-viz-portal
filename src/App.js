import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, PrivateRoute } from './components';
import {
  Home,
  KnowledgeBase,
  Login,
  NotFound,
  Poll,
  Profile,
  Quiz,
  Signup,
} from './pages';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className='app'>
      {authIsReady && (
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/knowledge-base' element={<KnowledgeBase />} />
            <Route path='/poll' element={<Poll />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route
              path='/login'
              element={
                <PrivateRoute user={user}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <PrivateRoute user={user}>
                  <Signup />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
