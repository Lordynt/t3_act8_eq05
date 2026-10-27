import { useState, useEffect } from 'react';
import '../styles/ProductsPage.css';

export default function UserModal({ isOpen, onClose, onSave, userToEdit }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', age: '' });

  useEffect(() => {
    if (userToEdit) {
      setFormData({ 
        firstName: userToEdit.firstName, 
        lastName: userToEdit.lastName, 
        email: userToEdit.email,
        age: userToEdit.age 
      });
    } else {
      setFormData({ firstName: '', lastName: '', email: '', age: '' });
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, age: Number(formData.age) });
  };

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(15, 23, 42, 0.6)', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  };

  return (
    <div style={overlayStyle}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2rem' }}>
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
          {userToEdit ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="modal-input-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={formData.firstName} 
              onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
              required 
            />
          </div>
          
          <div className="modal-input-group">
            <label>Apellido</label>
            <input 
              type="text" 
              value={formData.lastName} 
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
              required 
            />
          </div>

          <div className="modal-input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="modal-input-group">
            <label>Edad</label>
            <input 
              type="number" 
              value={formData.age} 
              onChange={(e) => setFormData({...formData, age: e.target.value})} 
              required 
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}