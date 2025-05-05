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
import { getCategories, getCurrentUser, getProductsByCategory } from '../../services/api_service'
import Modal from '../Modal/Modal';

// Componente general Login
function Home ({categories}) {

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [categoriesName, setCategoriesName] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Todos');
    const [modalText, setModalText] = useState(null);
    const [modalProcessing, setModalProcessing] = useState(false);

    // Datos del usuario, categorias y productos
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };
        const fetchProducts = async () => {
            const products = await getProductsByCategory(currentCategory)
            setProducts(products)
        };
        const fetchCategories = async () => {
            const categories = await getCategories()
            setCategoriesName(categories)
        };

        fetchCategories()
        fetchUser()
        fetchProducts()
    }, []);
    
    // Función para capitalizar el nombre de usuario
    function capitalizeName(userName) {
        if (userName){
            return userName.trim().split(/\s+/).map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        }
    }

    // Funcion para refrescar los productos
    const refreshProducts = async () => {
        const products = await getProductsByCategory(currentCategory);
        setProducts(products);
    };

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

                {/* Pagina Home*/}
                { !categories && 
                    <div className='init-tittle'>
                        Welcome, {capitalizeName(user?.name)}
                    </div>
                }

                {/* Pagina Categorías */}
                { categories && 

                    // Drop down de categorias
                    <div className='dropdown-container'>

                        {/* Logica del dropdown al cambiar de categoria */}
                        <select className='dropdown' value={currentCategory} 
                        onChange={async (e) => {
                            const category = e.target.value
                            setCurrentCategory(e.target.value)
                            const products = await getProductsByCategory(category)
                            setProducts(products)
                        }}>

                            {/* Todas las categorias */}
                            {categoriesName.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }

            </div>

            {/* <button onClick={logout}>cerrar sesion</button> */}

            {/* Cuerpo con los productos de la aplicación */}
            <div className='products'>

                {modalText && <Modal text={modalText} />}

                {products.length > 0 && (
                    
                    // Agrupamos en subarrays de dos todos los productos
                    products.reduce((rows, product, index) => {
                        if (index % 2 === 0){
                            rows.push([product])
                        }else{
                            rows[rows.length - 1].push(product)
                        }
                        return rows

                    // Recorremos los grupos de arrays de dos productos 
                    }, []).map((pair, idx) => (

                        // Cada fila de productos
                        <div key={idx} className="products-row">

                            {/* Cada uno de los productos */}
                            {pair.map((product) => (
                                <InitProduct 
                                    key={product?.id} 
                                    showModal={showModal} 
                                    product={product} 
                                    modalProcessing={modalProcessing} 
                                    setModalProcessing={setModalProcessing} 
                                    refreshProducts={refreshProducts} 
                                    isFavoritesView={categories && currentCategory === "Favoritos"}
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>

            {/* Footer de la aplicación */}
            <Footer />
        </div>
    )
}

export default Home