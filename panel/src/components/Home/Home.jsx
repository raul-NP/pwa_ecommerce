// Componentes
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

// Imagenes


// Fuentes y estilos
import '../../styles/fonts.css'
import '../../styles/colors.css'
import './Home.css'

// Funcionalidades
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../services/api_service'

// Componente general Login
function Home ({categories}) {

    // Datos del usuario
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getCurrentUser();
            setUser(userData);
        };
        fetchUserData();
    }, []);

    // Cierre de sesión del usuario
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/")
    };

    return (

        // Pantalla completa
        <div className='init-card'>

            {/* Header del incio */}
            <Header userName={user?.name} categories={categories}></Header>

            <button onClick={logout}>cerrar sesion</button>

            {/* Footer de la aplicación */}
            <Footer />
        </div>
    )
}

export default Home