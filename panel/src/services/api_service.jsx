// Ruta al api
const API_URL = import.meta.env.VITE_API_URL;

// Función para recoger los usuarios de la aplicación
export async function getUsers() {
    return await fetch(`${API_URL}/users`)
    .then(response => {
        return response.json();
    })
}

// Función que registra el usuario en la base de datos
export async function registerUser(user) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Error al registrar el usuario');
    }

    return await response.json();
}
  
// Función que verifica si el usuario y contraseña son válidos
export async function checkUser(username, password) {
    const response = await fetch(`${API_URL}/users/check`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username, password })
    });

    if (!response.ok) {
        return false;
    }

    const result = await response.json();
    return result.valid === true; 
}