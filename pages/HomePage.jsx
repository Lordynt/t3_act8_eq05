import DepartureCard from '../components/DepartureCard';
import '../styles/HomePage.css';

const DEPARTURES = [
  {
    id: 1,
    route: 'Ciudad de México (MEX) → Puebla (PBC)',
    time: '19:30',
    urbanNumber: 'Urban #207',
    driver: 'Alfonso Torres',
    gate: 'Terminal 2 - Andén 4',
    status: 'A Tiempo',
    seats: [
      { id: 1, occupied: false }, { id: 2, occupied: false }, { id: 3, occupied: false }, { id: 4, occupied: true }, 
      { id: 5, occupied: true },  { id: 6, occupied: false }, { id: 7, occupied: false }, { id: 8, occupied: false },
      { id: 9, occupied: false }, { id: 10, occupied: true }, { id: 11, occupied: false }, { id: 12, occupied: false },
      { id: 13, occupied: false }, { id: 14, occupied: false }, { id: 15, occupied: true }, { id: 16, occupied: false },
    ]
  },
  {
    id: 2,
    route: 'Guadalajara (GDL) → Monterrey (MTY)',
    time: '21:15',
    urbanNumber: 'Urban #305',
    driver: 'María López',
    gate: 'Terminal 1 - Andén 2',
    status: 'A Tiempo',
    seats: [
      { id: 1, occupied: true }, { id: 2, occupied: true }, { id: 3, occupied: false }, { id: 4, occupied: false }, 
      { id: 5, occupied: false }, { id: 6, occupied: true }, { id: 7, occupied: true }, { id: 8, occupied: true },
      { id: 9, occupied: false }, { id: 10, occupied: false }, { id: 11, occupied: false }, { id: 12, occupied: false },
      { id: 13, occupied: true }, { id: 14, occupied: true }, { id: 15, occupied: true }, { id: 16, occupied: true },
    ]
  },
  {
    id: 3,
    route: 'Querétaro (QRO) → CDMX (MEX)',
    time: '08:00',
    urbanNumber: 'Urban #112',
    driver: 'Carlos Ruiz',
    gate: 'Terminal 3 - Andén 8',
    status: 'Retrasado',
    seats: [
      { id: 1, occupied: false }, { id: 2, occupied: false }, { id: 3, occupied: false }, { id: 4, occupied: false }, 
      { id: 5, occupied: false }, { id: 6, occupied: false }, { id: 7, occupied: false }, { id: 8, occupied: false },
      { id: 9, occupied: true }, { id: 10, occupied: true }, { id: 11, occupied: true }, { id: 12, occupied: true },
      { id: 13, occupied: false }, { id: 14, occupied: false }, { id: 15, occupied: false }, { id: 16, occupied: true },
    ]
  }
];

export default function HomePage({ user }) {
  return (
    <div className="home-page">
      <div style={{ marginBottom: '0.5rem' }}>
        <p className="welcome-text">Bienvenido {user.firstName}</p>
        <h2 className="section-title">Salidas Disponibles</h2>
      </div>

      {DEPARTURES.map((departure) => (
        <DepartureCard key={departure.id} departure={departure} />
      ))}
    </div>
  );
}