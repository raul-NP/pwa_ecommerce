// Estilo
import './Footer.css'

// Imágenes
import homeSvg from '../../assets/imgs/home.svg';
import categoriesSvg from '../../assets/imgs/search_categories.svg';
import logoSvg from '../../assets/imgs/logo.svg';
import cartSvg from '../../assets/imgs/cart.svg';
import perfilSvg from '../../assets/imgs/user.svg';

// Funcionalidad
import { useNavigate } from 'react-router-dom';

// Footer de navegación de la aplicación
function Footer({n_products}) {
    
    const navigate = useNavigate()

    return(
        
        // Menú de navegación
        <nav className='menu'>

            {/* Home */}
            <div className='icon-card'>
                <img onClick={() => navigate("/home")} id='home-svg' src={homeSvg} />
            </div>

            {/* Search categories */}
            <div className='icon-card'>
                <img onClick={() => navigate("/categories")} id='categories-svg' src={categoriesSvg} />
            </div>

            {/* Logo (home) */}
            <div className='icon-card'>
                <img onClick={() => navigate("/home")} id='logo-svg' src={logoSvg} />
            </div>

            {/* Cart */}
            <div className='icon-card'>
                <img onClick={() => navigate("/cart")} id='cart-svg' src={cartSvg} />
                { n_products && n_products != 0 && <div id='n-products'>{n_products}</div>}
            </div>

            {/* Perfil */}
            <div className='icon-card'>
                <img onClick={() => navigate("/perfil")} id='perfil-svg' src={perfilSvg} />
            </div>
        </nav>
    )
}

export default Footer