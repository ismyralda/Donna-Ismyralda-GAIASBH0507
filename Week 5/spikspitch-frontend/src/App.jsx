import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import './index.css';
import './styles/App.css';
import './styles/global.css';
import './styles/style-guide.css';
import '@fontsource-variable/lexend';

import PublicLayout from './layouts/PublicLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Landing from './pages/Landing.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Pricing from './pages/Pricing.jsx'
import Checkout from './pages/Checkout.jsx'
import Success from './pages/Success.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Practice from './pages/dashboard/Practice.jsx'
import Results from './pages/dashboard/Results.jsx'
import Settings from './pages/dashboard/Settings.jsx'

// Scroll back to the top whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public pages: navbar + footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} /> */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* App pages: sidebar + top bar */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* do we need this line or just use "/*"? */}
          <Route path="practice/:mode" element={<Practice />} />
          <Route path="results/:id" element={<Results />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
