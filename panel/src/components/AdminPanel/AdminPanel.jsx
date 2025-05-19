// Estilo
import './AdminPanel.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';

// Imágenes
import settingsSvg from '../../assets/imgs/settings.svg';
import { useNavigate } from 'react-router-dom';

// Página de login donde el usuario inicia sesión
function AdminPanel() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    // Datos del usuario
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        fetchUser()

    }, []);

    return (
        <div>

            {/* Header de la aplicación */}
            <ProfileHeader user={user} text={"PANEL ADMIN"}></ProfileHeader>

            {/* Contenedor del panel de administrador */}
            <div className='admin-container'>

                {/* Redirección a la gestión de usuarios */}
                <div onClick={() => navigate("/profile/admin/users")} className='admin-option'>
                    <img src={settingsSvg}/>
                    <h1>Users Management</h1>
                </div>

                {/* Redirección a la gestión de categorías */}
                <div onClick={() => navigate("/profile/admin/categories")} className='admin-option'>
                    <img src={settingsSvg}/>
                    <h1>Categories Management</h1>
                </div>

                {/* Redirección a la gestión de productos */}
                <div onClick={() => navigate("/profile/admin/products")} className='admin-option'>
                    <img src={settingsSvg}/>
                    <h1>Products Management</h1>
                </div>
            </div>

            {/* Footer general de la aplicación */}
            <Footer ></Footer>
        </div>
    )
}

export default AdminPanel