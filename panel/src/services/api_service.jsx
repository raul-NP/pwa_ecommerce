// Ruta al api
const API_URL = import.meta.env.VITE_API_URL;

export function getToken() {
    return localStorage.getItem("token")
}

// Función para recoger los usuarios de la aplicación
export async function getUsers() {

    const token = getToken()

    const response = await fetch(`${API_URL}/users/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response.json();
}


// Función que recoge un usuario por nombre
export async function getUser(name) {

    const response = await fetch(`${API_URL}/users/${name}`);
    
    if (response.status != 200){
        return false
    }

    return await response.json()
}

// Función que registra el usuario en la base de datos
export async function registerUser(user) {

    const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    return await response.json();
}
  
// Función que verifica si el usuario y contraseña son válidos
export async function login(name, password) {
    
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    })

    if (response.status != 200){
        return false 
    }
    
    const data = await response.json()
    localStorage.setItem("token", data.access_token)
    return true
}