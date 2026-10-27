const BASE_URL = 'https://dummyjson.com/users';

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

export const getUsers = async ({ limit = 10, skip = 0, search = '', role = '' } = {}) => {
  const paging = `limit=${limit}&skip=${skip}`;
  
  if (search && role) {
    const data = await request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=0`);
    const filtered = data.users.filter(u => u.role === role);
    return {
      users: filtered.slice(skip, skip + limit),
      total: filtered.length,
      skip,
      limit
    };
  }

  if (search) {
    return request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&${paging}`);
  }

  if (role) {
    return request(`${BASE_URL}/filter?key=role&value=${encodeURIComponent(role)}&${paging}`);
  }

  return request(`${BASE_URL}?${paging}`);
};

export const createUser = (newUser) =>
  request(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

export const updateUser = (id, changes) =>
  request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });

export const deleteUser = (id) =>
  request(`${BASE_URL}/${id}`, { method: 'DELETE' });