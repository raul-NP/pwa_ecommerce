// Estilo
import './Cart.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import CartProduct from '../Product/CartProduct';
import Modal from '../Modal/Modal';

// Funcionalidad
import { useEffect, useState } from 'react';
import { deleteProductFromCart, getCartProducts, getCurrentUser, getProductsByCategory } from '../../services/api_service';
import { useNavigate } from 'react-router-dom';

// Página de login donde el usuario inicia sesión
function Cart() {

    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [modalText, setModalText] = useState(null);
    const [modalType, setModalType] = useState('');
    const [modalProcessing, setModalProcessing] = useState(false);
    const navigate = useNavigate()
 
    // Cargar usuario y productos del carrito
    useEffect(() => {

        const fetchData = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser)

            // Revisar si algun producto esta sin stock, eliminarlo del carrito
            const generalProducts = await getProductsByCategory('All')
            for (const product of generalProducts) {
                if (product?.stock == 0){
                    await deleteProductFromCart(product?.name, currentUser?.name)
                }
            }

            const cartProducts = await getCartProducts(currentUser.name);
            setProducts(cartProducts);
        }

        fetchData()  
        refreshCart()

    }, [])

    // Refresco de total, cantidad
    useEffect(() => {

        const calculatedTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
        const calculatedQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
        setTotal(calculatedTotal.toFixed(2));
        setTotalQuantity(calculatedQuantity);

    }, [products]);

    // Refresco de productos
    async function refreshCart() {

        if (user?.name){
            const refreshProducts = await getCartProducts(user.name);
            setProducts(refreshProducts);
        }
    }

    // Función para mostrar los modales
    const showModal = (text, type) => {
        setModalText(text);
        setModalType(type)
        setTimeout(() => {
            setModalText(null)
            setModalType('')
        }, 2000);
    };

    // Funcion de ir al pago de productos
    function payment() {

        // Caso en el que hay productos en carrito
        if (products.length > 0){
            navigate('/cart/payment')
        }

        // Proteccion de spam de clics
        if (modalProcessing) return 
        setModalProcessing(true);
        showModal("There are not products in cart", "cross")
        setTimeout(() => setModalProcessing(false), 2000);

    }

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader text={"CART"} user={user}></ProfileHeader>

            {/* Contenedor de la página Carrito */}
            <div className='cart-container'>

                {modalText && <Modal text={modalText} type={modalType}/>}

                {/* Cuerpo del carrito */}
                <div className='cart-body'>
                    
                    <h1>Products ({totalQuantity})</h1>

                    {/* Productos del carrito */}
                    <div className='cart-products'>

                        {/* Cada uno de los productos */}
                        {products.length > 0 &&
                            products.map((product) => (
                                <CartProduct 
                                    key={product.id} 
                                    product={product} 
                                    quantity={product.quantity} 
                                    userName={user?.name} 
                                    refreshCart={refreshCart}
                                    showModal={showModal} 
                                    modalProcessing={modalProcessing} 
                                    setModalProcessing={setModalProcessing}
                                />
                            ))
                        }

                    </div>

                    {/* Total del carrito */}
                    <div className='cart-total'>
                        Total: ${total}
                    </div>

                    <Button className={'cart-payment-button'} onClick={payment} width={'34vw'} height={'4.5vh'} text={'Payment'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>

                </div>

            </div>

            {/* Footer general */}
            <Footer></Footer>

        </div>

    )
}

export default Cart