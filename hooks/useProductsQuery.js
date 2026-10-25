import { useEffect, useState } from 'react';

export const LIMIT_OPTIONS = [10, 20, 40, 50];
const DEFAULT_LIMIT = 10;

// Lee ?page=2&limit=20&search=...&category=... de la URL
const readQueryFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page'), 10);
  const limit = parseInt(params.get('limit'), 10);

  return {
    page: page > 0 ? page : 1,
    limit: LIMIT_OPTIONS.includes(limit) ? limit : DEFAULT_LIMIT,
    search: params.get('search') || '',
    category: params.get('category') || '',
  };
};

const buildUrl = (query) => {
  const params = new URLSearchParams();
  params.set('page', query.page);
  params.set('limit', query.limit);
  if (query.search) params.set('search', query.search);
  if (query.category) params.set('category', query.category);
  return `${window.location.pathname}?${params.toString()}`;
};

// Mantiene sincronizados el estado de la tabla y la URL del navegador
export default function useProductsQuery() {
  const [query, setQuery] = useState(readQueryFromUrl);

  // Al entrar, normaliza la URL (por ejemplo agrega ?page=1&limit=10)
  useEffect(() => {
    window.history.replaceState(null, '', buildUrl(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Botón "atrás" / "adelante" del navegador
  useEffect(() => {
    const handlePopState = () => setQuery(readQueryFromUrl());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateQuery = (changes) => {
    const nextQuery = { ...query, ...changes };
    const nextUrl = buildUrl(nextQuery);

    if (nextUrl !== buildUrl(query)) {
      window.history.pushState(null, '', nextUrl);
    }
    setQuery(nextQuery);
  };

  return { query, updateQuery };
}