// Estilo
import './Orders.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import Footer from '../Footer/Footer';
import Order from '../Order/Order';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser, getOrdersByUser } from '../../services/api_service';

// Página de login donde el usuario inicia sesión
function Orders() {

    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])

    // Datos del usuario, pedidos
    useEffect(() => {
    
        const fetchData = async () => {

            const currentUser = await getCurrentUser()
            const orders = await getOrdersByUser(currentUser.name);
            setUser(currentUser)
            setOrders(orders);
            console.log(orders);
            
            
        }

        fetchData()  
    }, []);

    return (
        <div>

            {/* Cabecera de la página */}
            <ProfileHeader text={"ORDERS"} user={user}></ProfileHeader>

            {/* Contenido de los pedidos */}
            <div className='order-container'>

                {/* Cada uno de los pedidos */}
                {orders.length > 0 &&
                    orders.map((order, i) => (
                        <Order key={i} order={order} />
                    ))
                }

            </div>

            {/* Footer general de la aplicación */}
            <Footer></Footer>

        </div>
    )
}

export default Orders