import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

function App() {
  // Estado global del usuario: null = no ha iniciado sesión
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  // Protección de la vista: el sistema SOLO se muestra si hay un usuario en el estado
  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
