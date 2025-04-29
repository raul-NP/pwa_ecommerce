import './PerfilHeader.css'

// Header de inicio y búsqueda de categorías
function PerfilHeader({categories, userName}) {
    
    

    return (

        // Header
        <div className=''>

            {/* Icono Perfil */}
            <div className=''>
                <h1></h1>
            </div>

            <h1>{userName}</h1>

        </div>
    )
}

export default PerfilHeader