import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className='app'>
      <Router>
        <h1>Data Viz Portal</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/knowledge-base' element={<KnowledgeBase />} />
          <Route path='/poll' element={<Poll />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
