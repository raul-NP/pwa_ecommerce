// Estilo
import './Payment.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCartProducts, getCurrentUser, getProductsByCategory } from '../../services/api_service';

function Payment() {

    const [user, setUser] = useState(null)

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
    }, []);

    // Comprobar en el back al hacer la resta si hay stock suficiente, si no modal y recargar pagina,
    // dejando el stock que haya y si no hay stock eliminarlo de los productos del carrito
    // No dejar pagar si no hay productos en la pasarela de pago

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader user={user}></ProfileHeader>

            {/* Contenedor de la página Pago */}
            <div className='payment-container'>

                {/* Productos a pagar */}
                <div className='payment-products'>

                </div>

                {/* Dirección de pago de productos */}
                <div className='payment-address'>

                </div>

            </div>

            {/* Footer general */}
            <Footer></Footer>

        </div>
    )
}

export default Payment