import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login-page">
      <div className="login-image-side">
        <img 
          src={`${import.meta.env.BASE_URL}urban.jpeg`} 
          alt="Avión volando sobre la ciudad al atardecer" 
        />
      </div>

      <div className="login-form-side">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}