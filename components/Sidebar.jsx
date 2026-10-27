import { MENU_ITEMS } from '../constants/menuItems';
import { LogoutIcon } from './Icons';
import '../styles/Sidebar.css';

export default function Sidebar({ activeView, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`sidebar-item ${activeView === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="sidebar-logout" onClick={onLogout}>
        <LogoutIcon size={22} />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}