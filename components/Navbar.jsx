import { MonitorIcon } from './Icons';
import '../styles/Navbar.css';

export default function Navbar({ title, user }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0088FF&color=fff&bold=true&size=128`;

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
          src={avatarUrl}
          alt={`Avatar de ${user.firstName}`}
          className="navbar-avatar"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </header>
  );
}