export default function ProfilePage({ user }) {
  return (
    <div className="card profile-card">
      <img src={user.image} alt="Foto de perfil" className="profile-avatar" />
      <div>
        <h2>{user.firstName} {user.lastName}</h2>
        <p className="muted">@{user.username}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Género:</strong> {user.gender}</p>
      </div>
    </div>
  );
}