// Estilo
import './Cart.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import CartProduct from '../Product/CartProduct';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCartProducts, getCurrentUser } from '../../services/api_service';

// Imagenes


// Página de login donde el usuario inicia sesión
function Cart() {

    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    // Modales
    
 
    // Cargar usuario  refresco de carrito
    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
            refreshCart(currentUser)
        }
        fetchData()
    }, [])

    // Función que refresca el carrito (productos, totales ...)
    const refreshCart = async (currentUser) => {
        if (currentUser?.name) {

            // Obtenemos los productos
            const cartProducts = await getCartProducts(currentUser.name);
            setProducts(cartProducts);

            // Calcular total y cantidad
            const calculatedTotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
            const calculatedQuantity = cartProducts.reduce((sum, p) => sum + p.quantity, 0);

            setTotal(calculatedTotal.toFixed(2));
            setTotalQuantity(calculatedQuantity);
        }
    };

    // Funcion de ir al pago de productos
    function payment() {
        
    }

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader user={user}></ProfileHeader>

            {/* Contenedor de la página Carrito */}
            <div className='cart-container'>

                {/* Cuerpo del carrito */}
                <div className='cart-body'>
                    
                    <h1>Products ({totalQuantity})</h1>

                    {/* Productos del carrito */}
                    <div className='cart-products'>

                        {/* Cada uno de los productos */}
                        {products.length > 0 &&
                            products.map((product) => (
                                <CartProduct key={product.id} product={product} quantity={product.quantity} userName={user?.name} refreshCart={refreshCart}/>
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