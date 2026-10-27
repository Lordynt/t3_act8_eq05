import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { MENU_ITEMS } from '../constants/menuItems';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage'; 
import ComingSoonPage from './ComingSoonPage';
import '../styles/Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState('inicio');
  const activeItem = MENU_ITEMS.find((item) => item.id === activeView);

  const renderActiveView = () => {
    if (activeView === 'inicio') {
      return <HomePage user={user} />;
    }
    
    if (activeView === 'usuarios') {
      return <ProductsPage />; 
    }

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