// Estilo
import './CategoriesManagement.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';
import { useNavigate } from 'react-router-dom';

// Imágenes
import settingsSvg from '../../assets/imgs/settings.svg';

// Página de login donde el usuario inicia sesión
function CategoriesManagement() {

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
            <ProfileHeader user={user} text={"CATEGORIES MANAGEMENT"}></ProfileHeader>

            {/* Contenedor del panel de administrador */}
            <div className='admin-user-container'>

                
            </div>

            {/* Footer general de la aplicación */}
            <Footer ></Footer>
        </div>
    )
}

export default CategoriesManagement