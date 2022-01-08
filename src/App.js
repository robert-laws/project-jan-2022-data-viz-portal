import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Navigation, PrivateRoute } from './components';
import {
  Home,
  KnowledgeBase,
  Login,
  NotFound,
  Poll,
  Profile,
  Quiz,
  QuizResults,
  Signup,
  AddData,
  Dashboard,
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
            <Route path='/poll' element={<Poll />}>
              <Route path=':weekNumber' element={<Poll />} />
            </Route>
            <Route path='/quiz' element={<Quiz />}>
              <Route path=':weekNumber' element={<Quiz />} />
            </Route>
            <Route path='/quiz/results/:weekNumber' element={<QuizResults />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/add' element={<AddData />} />
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
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
