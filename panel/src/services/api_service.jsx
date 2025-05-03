// Ruta al api
const API_URL = import.meta.env.VITE_API_URL;

export function getToken() {
    return localStorage.getItem("token")
}

// -------------------------------  USUARIOS -------------------------------

// Función para recoger los usuarios de la aplicación
// export async function getUsers() {

//     const token = getToken()

//     const response = await fetch(`${API_URL}/users/`, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     return response.json();
// }

// Función que recoge un usuario por nombre
// export async function getUser(name) {

//     const response = await fetch(`${API_URL}/users/${name}`);
    
//     if (response.status != 200){
//         return false
//     }

//     return await response.json()
// }

// Función para recuperar el usuario loggeado
export async function getCurrentUser() {

    const token = getToken()

    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.json();
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

    // Usuario ya existente
    if (response.status != 200){
        return false
    }

    return await response.json();
}
  
// Función que verifica si el usuario y contraseña son válidos
export async function login(name, password) {
    
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    })

    // Usuario no existe o credenciales incorrectas
    if (response.status != 200){
        return false 
    }
    
    const data = await response.json()
    localStorage.setItem("token", data.access_token)
    return true
}

// ------------------- CATEGORÍAS --------------------

// Recupera todas las categorías
export async function getCategories() {
    const token = getToken();
    const response = await fetch(`${API_URL}/categories/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
}

// ------------------- PRODUCTOS --------------------

// Recupera todos los productos
// export async function getAllProducts() {
//     const token = getToken();
//     const response = await fetch(`${API_URL}/products/`, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });

//     return response.json();
// }

// Recupera productos por nombre de categoría
export async function getProductsByCategory(categoryName) {
    const token = getToken();
    const response = await fetch(`${API_URL}/products/${categoryName}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
}

// Asigna un producto a una categoría
export async function assignProductToCategory(id_product, category_name) {
    const token = getToken();
    const response = await fetch(`${API_URL}/products/${category_name}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_product })
    });

    // Caso en el que el producto ya esta en la categoria 
    if (response.status == 409){
        return false
    }

    return await response.json();
}

// Desasigna un producto de una categoría
export async function removeProductFromCategory(id_product, category_name) {
    const token = getToken();
    const response = await fetch(`${API_URL}/products/${category_name}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_product })
    });

    // Caso en el que el producto no esta en la categoria 
    if (response.status == 409){
        return false
    }

    return await response.json();
}

