import { useState } from 'react';
import '../styles/HomePage.css';

export default function DepartureCard({ departure }) {
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.occupied) return;
    setSelectedSeat(prev => prev === seat.id ? null : seat.id);
  };

  return (
    <section className="welcome-card">
      <article className="flight-card">
        <div className="flight-info">
          <h3 className="flight-route">{departure.route}</h3>
          <div className="flight-time-block">
            <span className="time-label">Salida</span>
            <span className="time-value">{departure.time} hrs</span>
          </div>
        </div>

        <div className="flight-details">
          <div className="detail-item">
            <span className="detail-label">Unidad</span>
            <span className="detail-value">{departure.urbanNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Chofer</span>
            <span className="detail-value">{departure.driver}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Andén</span>
            <span className="detail-value">{departure.gate}</span>
          </div>
        </div>

        <div className="flight-side">
          <span className="status-badge">{departure.status}</span>
        </div>
      </article>

      <div className="seats-toggle-container">
        <button 
          className="seats-toggle-btn" 
          onClick={() => setShowSeats(!showSeats)}
        >
          {showSeats ? 'Ocultar Selección de Asientos ▲' : 'Ver Selección de Asientos ▼'}
        </button>
      </div>

      {showSeats && (
        <div className="bus-layout-container animate-fade-in">
          <p className="muted" style={{ marginBottom: '1rem' }}>Elige tu lugar para el viaje.</p>

          <div className="seats-grid">
            {departure.seats.map((seat) => (
              <div 
                key={seat.id} 
                className={`seat ${seat.occupied ? 'occupied' : 'available'} ${selectedSeat === seat.id ? 'selected' : ''}`}
                title={seat.occupied ? 'Ocupado' : `Asiento ${seat.id}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.id}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}