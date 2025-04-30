// Componentes
import Footer from '../Footer/Footer'
import PerfilIcon from '../PerfilIcon/PerfilIcon';
import InitProduct from '../Product/InitProduct';

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

    const [user, setUser] = useState(null);
    const [modalText, setModalText] = useState(null);
    const categoriesName = ["TODOS", "ANILLOS", "COLLARES", "RELOJES"]

    // Datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getCurrentUser();
            setUser(userData);
        };
        fetchUserData();
    }, []);
    
    // Función para capitalizar el nombre de usuario
    function capitalizeName(userName) {
        if (userName){
            return userName.trim().split(/\s+/).map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        }
    }

    // Función para mostrar los modales
    const showModal = (text) => {
        setModalText(text);
        setTimeout(() => setModalText(null), 3000);
    };
    

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
            <div className='init-header'>

                {/* Icono del perfil */}
                <PerfilIcon userName={user?.name}></PerfilIcon>

                {/* Mensaje de bienvenida */}
                { !categories && 
                    <div className='init-tittle'>
                        Bienvenido, {capitalizeName(user?.name)}
                    </div>
                }

                {/* Barra de búsqueda de categorías */}
                { categories && 

                    // Drop down
                    <div className='dropdown-container'>
                        <select className='dropdown'>
                            {categoriesName.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                }

            </div>

            <button onClick={logout}>cerrar sesion</button>

            {/* Cuerpo con los productos de la aplicación */}
            <div className='products'>

                {modalText && <Modal text={modalText} />}

                {/* Cada fila de dos productos */}
                <div className='products-row'>

                    {/* Cada producto */}
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                </div>

                <div className='products-row'>

                    {/* Cada producto */}
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                </div>

                <div className='products-row'>

                    {/* Cada producto */}
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                </div>

                <div className='products-row'>

                    {/* Cada producto */}
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                    <InitProduct showModal={showModal} productImage={"https://www.rabat.net/media/catalog/product/r/o/rolex-deepsea-m136660-0005.png"} productName={"Reloj Rolex"} productPrice={2199.99}></InitProduct>
                </div>

            </div>

            {/* Footer de la aplicación */}
            <Footer />
        </div>
    )
}

export default Home