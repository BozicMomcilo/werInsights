import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SignIn } from './components/pages/auth/SignIn';
import { GeneralDashboard } from './components/pages/dashboard/GeneralDashboard';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard/*" element={<GeneralDashboard />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;