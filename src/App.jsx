import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;