import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { MENU_ITEMS } from '../constants/menuItems';
import HomePage from './HomePage';
import ComingSoonPage from './ComingSoonPage';
import '../styles/Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  // Vista activa del sistema (simula la navegación del menú lateral)
  const [activeView, setActiveView] = useState('inicio');

  const activeItem = MENU_ITEMS.find((item) => item.id === activeView);

  const renderActiveView = () => {
    if (activeView === 'inicio') {
      return <HomePage user={user} />;
    }
    // Las demás opciones son simuladas (la tabla se hará en la Fase 3)
    return <ComingSoonPage title={activeItem.label} />;
  };

  return (
    <div className="app-shell">
      <Navbar title={activeItem.label} user={user} onLogout={onLogout} />

      <div className="app-body">
        <Sidebar activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />
        <main className="app-content">{renderActiveView()}</main>
      </div>
    </div>
  );
}
