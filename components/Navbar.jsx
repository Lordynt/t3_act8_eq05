import { MonitorIcon, LogoutIcon } from './Icons';
import '../styles/Navbar.css';

export default function Navbar({ title, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <MonitorIcon size={22} />
        <span>Mi Sistema</span>
      </div>

      <h1 className="navbar-title">{title}</h1>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <span className="navbar-name">{user.firstName} {user.lastName}</span>
          <span className="navbar-email">{user.email}</span>
        </div>
        <img
          src={user.image}
          alt={`Foto de perfil de ${user.username}`}
          className="navbar-avatar"
        />
        <button
          type="button"
          className="navbar-logout"
          onClick={onLogout}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          <LogoutIcon size={18} />
        </button>
      </div>
    </header>
  );
}
