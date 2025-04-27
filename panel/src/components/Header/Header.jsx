import './Header.css'

// Header de inicio y búsqueda de categorías
function Header({categories, userName}) {
    
    

    return (

        // Header
        <div className='header-card'>

            {/* Icono Perfil */}
            <div className='perfil-icon'>
                <h1></h1>
            </div>

            <h1>{userName}</h1>

        </div>
    )
}

export default Header