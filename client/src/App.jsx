import LoginSignup from './pages/LoginSignup';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmailSent from './pages/EmailSent';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginSignup />} />
          <Route path='verifyEmail' element={<EmailSent />} />
          <Route element={<RequireAuth allowedRoles={['Individual', 'Admin', 'Organization']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['Admin']} />}>
            <Route path="/Admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;