// Estilo
import './ProfileHeader.css'

// Componente
import PerfilIcon from '../PerfilIcon/PerfilIcon';

// Header de inicio y búsqueda de categorías
function ProfileHeader({user}) {
    
    // Función para capitalizar el nombre de usuario
    function capitalizeName(userName) {
        if (userName){
            return userName.trim().split(/\s+/).map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        }
    }

    return (

        // Container del header del perfil
        <div className='profile-header-container'>
            
            {/* Catd del header del perfil */}
            <div className='profile-header-card'>

                {/* Icono del perfil */}
                <PerfilIcon userName={user?.name}></PerfilIcon>

                {/* Mensaje de bienvenida */}
                <div className='profile-header-tittle'>
                    Welcome, {capitalizeName(user?.name)}
                </div>
                
            </div>
        </div>
        
    )
}

export default ProfileHeader