// Estilo
import './Discount.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/api_service';

// Página de login donde el usuario inicia sesión
function Discount() {

    const [user, setUser] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [activeDiscount, setActiveDiscount] = useState(false)
 
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
            
            // Seteamos el estado del descuento
            const isDiscountActive = Boolean(user?.discount);
            setActiveDiscount(isDiscountActive);

            // Comprobamos si el usuario puede optar al descuento
            if (user?.points >= 0 && !isDiscountActive){
                setDisabled(false)
            }
        };

        fetchUser()

    }, []);

    // Función para obtener el descuento
    async function getDiscount() {
        
        // Modificar el usuario 
        const updatedUser = {
            name: user?.name,
            points: user?.points - 100,
            discount: true
        };

        // En caso de fallo
        if (! await updateUser(updatedUser)){
            return
        }

        // Activamos el descuento activo y deshabilitamos el botón
        setActiveDiscount(true)
        setDisabled(true)

        // Refrescamos los puntos
        const refreshUser = await getCurrentUser()
        setUser(refreshUser)
    }

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader user={user}></ProfileHeader>

            {/* Cuerpo de la página descuentos */}
            <div className='discount-body'>

                {/* Puntos del usuario */}
                <div className='discount-points'>
                    <p>You have accumulated:</p>
                    <p className='points'>{user?.points} points</p>
                </div>

                {/* Botón para conseguir tu descuento */}
                <div className='discount-button'>
                    <button disabled={disabled} onClick={getDiscount}>¡GET DISCOUNT!</button>
                </div>

                {/* Mensaje del estado del descuento */}
                <div className='discount'>

                    {/* Descuento inactivo */}
                    { !activeDiscount && <div>
                        <p>You don’t have</p>
                        <p>active promotions</p>
                    </div>}

                    {/* Descuento activo */}
                    { activeDiscount && <div className='discount-active'>
                        <p>¡Congratulations!</p>
                        <div className='discount-active-circle'>
                            - $50
                        </div>
                        <p>In your next purchase</p>
                    </div> }
                </div>

            </div>

            {/* Footer general */}
            <Footer></Footer>

        </div>

    )
}

export default Discount