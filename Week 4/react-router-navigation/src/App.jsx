import { lazy, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import Settings from './components/Settings';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import QueryString from './pages/QueryString';

// import Navigation from './components/Navigation';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
const Navigation = lazy(() => import('./components/Navigation'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return(
    <div className='App'>
      {/* Header area with auth status toggle button */}
      <header style={{ padding: '10px', background: '#3c3b3b' }}>
        <p>
          Status: <strong>{isAuthenticated ? 'Authenticated (Logged In)' : 'Not Authenticated (Logged Out)'}</strong>
        </p>
        <button style={{background: '#000000'}} onClick={toggleAuth}>
          {isAuthenticated ? 'Log Out' : 'Log In'}
        </button>
      </header>

      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />}> {/* "/*" for subpages in dashboard */}
            <Route path="overview" element={<Overview />}/>
            <Route path="settings" element={<Settings />}/>
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin />
            </ProtectedRoute>
          }/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/user-profile" element={<QueryString />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
