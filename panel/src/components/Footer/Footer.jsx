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
import { useEffect, useState } from 'react';
import { getCartProducts, getCurrentUser } from '../../services/api_service';

// Footer de navegación de la aplicación
function Footer() {
    
    const navigate = useNavigate()
    const [nProducts, setNProducts] = useState()

    // Cantidad de productos del carrito
    useEffect(() => {
        
        const loadCartCount = async () => {
            const user = await getCurrentUser();
            const cart = await getCartProducts(user.name);
            setNProducts(cart.length);
        }

        // Cargar al inicio
        loadCartCount()

        // Escuchar evento global
        const handleCartUpdate = () => {
            loadCartCount()
        }

        // Añadimos escucha de un evento global y al escuchar actualizamos
        window.addEventListener("cartUpdated", handleCartUpdate)

        // Limpieza del listener
        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate)
        }

    }, []);

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
                { nProducts > 0 && <div id='n-products'>{nProducts}</div>}
            </div>

            {/* Perfil */}
            <div className='icon-card'>
                <img onClick={() => navigate("/profile")} id='perfil-svg' src={perfilSvg} />
            </div>
        </nav>
    )
}

export default Footer