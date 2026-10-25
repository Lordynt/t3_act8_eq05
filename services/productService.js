// API elegida: DummyJSON Products -> https://dummyjson.com/products
const BASE_URL = 'https://dummyjson.com/products';

// Hace la petición y convierte los errores en mensajes legibles para el usuario
const request = async (url, options = {}) => {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
  }

  if (!response.ok) {
    throw new Error(`Error del servidor (${response.status}). Intenta de nuevo.`);
  }

  return response.json();
};

// GET: productos con paginación, búsqueda y categoría
export const getProducts = async ({ limit = 10, skip = 0, search = '', category = '' } = {}) => {
  const paging = `limit=${limit}&skip=${skip}`;

  // La API no permite buscar y filtrar por categoría a la vez,
  // así que en ese caso traemos la búsqueda completa y filtramos aquí.
  if (search && category) {
    const data = await request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=0`);
    const filtered = data.products.filter((product) => product.category === category);
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
      skip,
      limit,
    };
  }

  if (search) {
    return request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&${paging}`);
  }
  if (category) {
    return request(`${BASE_URL}/category/${encodeURIComponent(category)}?${paging}`);
  }
  return request(`${BASE_URL}?${paging}`);
};
// Respuesta: { products: [...], total: 194, skip: 0, limit: 10 }

// GET: categorías para el filtro -> [{ slug, name, url }, ...]
export const getCategories = () => request(`${BASE_URL}/categories`);

// POST: agregar (la API responde con el producto y un id nuevo, pero NO lo guarda)
export const createProduct = (newProduct) =>
  request(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });

// PUT: editar
export const updateProduct = (id, changes) =>
  request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });

// DELETE: eliminar
export const deleteProduct = (id) =>
  request(`${BASE_URL}/${id}`, { method: 'DELETE' });