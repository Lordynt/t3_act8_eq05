const API_URL = 'https://dummyjson.com/auth/login';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // Opcional
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // DummyJSON devuelve un mensaje de error si las credenciales fallan
      throw new Error(data.message || 'Usuario o contraseña incorrectos');
    }

    return data; // Retorna los datos del usuario (incluye token, image, firstName, etc.)
  } catch (error) {
    throw error;
  }
};