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

export const getUsers = async ({ limit = 10, skip = 0, search = '' } = {}) => {
  const paging = `limit=${limit}&skip=${skip}`;
  
  if (search) {
    return request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&${paging}`);
  }
  return request(`${BASE_URL}?${paging}`);
};

export const getRoles = () => request(`${BASE_URL}/filter?key=role&value=admin`); 

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