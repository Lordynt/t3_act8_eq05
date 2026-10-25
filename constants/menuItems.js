import {
  HomeIcon,
  HistoryIcon,
  TagIcon,
  LifeBuoyIcon,
  SettingsIcon,
} from '../components/Icons';

// Opciones del menú lateral (las mismas del Figma). "id" es la vista que se mostrará.
export const MENU_ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: HomeIcon },
  { id: 'historial', label: 'Historial', icon: HistoryIcon },
  { id: 'promociones', label: 'Promociones', icon: TagIcon },
  { id: 'ayuda', label: 'Ayuda', icon: LifeBuoyIcon },
  { id: 'configuracion', label: 'Configuración', icon: SettingsIcon },
];
