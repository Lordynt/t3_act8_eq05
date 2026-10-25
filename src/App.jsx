import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
// import Dashboard from './pages/Dashboard'; // Lo crearás en la Fase 2

function App() {
  // Estado global del usuario
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        // FASE 2: Aquí irá tu Sidebar + Navbar
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Bienvenido, {user.firstName} {user.lastName}</h1>
          <img src={user.image} alt="Perfil" style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }} />
          <br /><br />
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#CC7215', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Cerrar Sesión
          </button>
          <p style={{ marginTop: '1rem', color: '#888' }}>(Fase 2 pendiente: Sidebar + Navbar)</p>
        </div>
      ) : (
        // FASE 1: Login
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;