// Estilo
import './Profile.css'

// Componentes
import Footer from '../Footer/Footer';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';

// Componente perfil
function Profile() {

    const [user, setUser] = useState(null)
 
    // Datos del usuario
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        fetchUser()
    }, []);

    return (

        <div>

            {/* Cabecera del perfil */}
            <ProfileHeader user={user}></ProfileHeader>

            <div className='perfil-body'>
                <div className='perfil-options'></div>
                <div className='perfil-'></div>
            </div>

            {/* Menú footer de la aplicación */}
            <Footer></Footer>
            
        </div>

    )
        
}

export default Profile