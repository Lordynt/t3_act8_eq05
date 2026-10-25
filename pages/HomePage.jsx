import { useState } from 'react';
import '../styles/HomePage.css';

// Datos simulados (como en el mockup de Figma)
const NEXT_FLIGHT = {
  route: 'Ciudad de México (MEX) → Londres (LHR)',
  date: '15 de Noviembre, 2026',
  time: '19:30 PM → 13:45 PM (+1)',
  flightNumber: 'BA 232',
  seat: 'A12',
  travelClass: 'Turista Premium',
  price: '$1,250.00 USD',
  status: 'Pagado',
  image: 'londres.jpg',
};

const SUGGESTED_TRIPS = [
  {
    id: 1,
    title: 'Europa - Duomo de Milán',
    date: '05 de Mayo, 2026',
    origin: 'Bogotá (BOG)',
    destination: 'Milán (MXP)',
    price: '$900.00 USD',
    image: 'milan.jpg',
  },
  {
    id: 2,
    title: 'Corea del Sur - Palacio Gyeongbokgung',
    date: '15 de Octubre, 2026',
    origin: 'Ciudad de México (MEX)',
    destination: 'Seúl (ICN)',
    price: '$1,450.00 USD',
    image: 'seul.jpg',
  },
];

// Imagen desde public/flights/. Si no existe el archivo, muestra un fondo de color.
function TripImage({ file, alt }) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div className="trip-image">
      {hasFailed ? (
        <span className="trip-image-placeholder">✈</span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}flights/${file}`}
          alt={alt}
          onError={() => setHasFailed(true)}
        />
      )}
    </div>
  );
}

export default function HomePage({ user }) {
  return (
    <div className="home-page">
      <section className="welcome-card">
        <p className="welcome-text">Bienvenido {user.firstName}</p>
        <h2 className="section-title">Próximo Vuelo</h2>

        <article className="flight-card">
          <div className="flight-info">
            <h3 className="flight-route">{NEXT_FLIGHT.route}</h3>
            <div className="flight-details">
              <p>Fecha: {NEXT_FLIGHT.date}</p>
              <p>Pasajero: {user.firstName} {user.lastName}</p>
              <p>Hora: {NEXT_FLIGHT.time}</p>
              <p>Asiento: {NEXT_FLIGHT.seat}</p>
              <p>Número de Vuelo: {NEXT_FLIGHT.flightNumber}</p>
              <p>Clase: {NEXT_FLIGHT.travelClass}</p>
            </div>
          </div>

          <div className="flight-side">
            <span className="flight-price">{NEXT_FLIGHT.price}</span>
            <span className="status-badge">{NEXT_FLIGHT.status}</span>
          </div>

          <TripImage file={NEXT_FLIGHT.image} alt="Destino del próximo vuelo" />
        </article>
      </section>

      <section>
        <h2 className="section-title">Podría Interesarte</h2>

        <div className="suggestions-grid">
          {SUGGESTED_TRIPS.map((trip) => (
            <article key={trip.id} className="suggestion-card">
              <TripImage file={trip.image} alt={trip.title} />
              <div>
                <h3 className="suggestion-title">{trip.title}</h3>
                <ul className="suggestion-details">
                  <li>Fecha: {trip.date}</li>
                  <li>Lugar Origen: {trip.origin}</li>
                  <li>Lugar Destino: {trip.destination}</li>
                  <li>Precio: {trip.price}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
