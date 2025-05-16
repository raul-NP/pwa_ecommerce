// Estilo
import './ProfileHeader.css'

// Componente
import PerfilIcon from '../PerfilIcon/PerfilIcon';

// Header de inicio y búsqueda de categorías
function ProfileHeader({user, text}) {

    return (

        // Container del header del perfil
        <div className='profile-header-container'>
            
            {/* Catd del header del perfil */}
            <div className='profile-header-card'>

                {/* Icono del perfil */}
                <PerfilIcon userName={user?.name}></PerfilIcon>

                {/* Mensaje de bienvenida */}
                <div className='profile-header-text'>
                    <h1 className='profile-header-tittle'>{text}</h1>
                </div>
                
            </div>
        </div>
        
    )
}

export default ProfileHeader