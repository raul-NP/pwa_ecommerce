// Estilo
import './PerfilIcon.css'

// Icono del perfil del usuario
function PerfilIcon({userName}) {
    
    // Función que recopila las iniciales del nombre de usuario para mostrarlas en el icono del perfil
    function initials(userName) {
    
        if (userName){
            let initials = ""
            initials += userName.split(" ")[0][0]
            initials += userName.split(" ")[1] ? userName.split(" ")[1][0] : userName.split(" ")[0][1]
    
            return initials.toLocaleUpperCase()
        }
    }

    return (
        <div className='perfil-icon-card'>
            <div className='perfil-icon'>
                {initials(userName)}
            </div>
        </div>
    )

}

export default PerfilIcon