import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login-page">
      {/* Lado izquierdo: Imagen del avión */}
      <div className="login-image-side">
        <img 
          src={`${import.meta.env.BASE_URL}default_header_2.png`} 
          alt="Avión volando sobre la ciudad al atardecer" 
        />
      </div>

      {/* Lado derecho: Formulario */}
      <div className="login-form-side">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}