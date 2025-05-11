// Estilo
import './Cart.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';
import Button from '../Button/Button';

// Imagenes


// Página de login donde el usuario inicia sesión
function Cart() {

    
    const [user, setUser] = useState(null)
    const [total, setTotal] = useState(null)
    const [quantity, setQuantity] = useState(null)

    // Modales
    
 
    // Datos del usuario
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        fetchUser()

    }, []);

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
                    
                    <h1>Products ({quantity})</h1>

                    {/* Productos del carrito */}
                    <div className='cart-products'>

                        {/* Cada uno de los productos */}

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