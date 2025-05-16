// Estilo
import './Discount.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/api_service';

// Página de login donde el usuario inicia sesión
function Discount() {

    const [user, setUser] = useState(null)
    const [activeDiscount, setActiveDiscount] = useState(false)
    const [noPointsModal, setNoPointsModal] = useState(false)
    const [activeDiscountModal, setActiveDiscountModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
 
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
            
            // Seteamos el estado del descuento
            const isDiscountActive = Boolean(user?.discount);
            setActiveDiscount(isDiscountActive);
        };

        fetchUser()

    }, []);

    // Función para obtener el descuento
    async function getDiscount() {

        // Evitar spam de clics
        if (activeDiscountModal || noPointsModal || successModal) return

        // En caso de que el usuario tenga ya un descuento activo
        if (activeDiscount){
            
            // Modal de aviso
            setActiveDiscountModal(true);
            setTimeout(() => {
                setActiveDiscountModal(false)
            }, 2000);
            
        // En caso de que el usuario no tenga los suficientes puntos
        }else if(user?.points < 100){
            
            // Modal de aviso
            setNoPointsModal(true);
            setTimeout(() => {
                setNoPointsModal(false)
            }, 2000);

        // Caso en que se aplica con éxito el descuento
        }else{

            // Modal de aviso
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false)
            }, 2000);

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

            // Refrescamos los puntos
            const refreshUser = await getCurrentUser()
            setUser(refreshUser)
        }
    }

    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader text={"DISCOUNTS"} user={user}></ProfileHeader>

            {/* Cuerpo de la página descuentos */}
            <div className='discount-body'>

            { noPointsModal && <Modal text={'You must have more than 100 points to get the discount'} type={'cross'}></Modal>}
            { activeDiscountModal && <Modal text={'There is already an active discount'} type={'cross'}></Modal>}
            { successModal && <Modal text={'The discount has been applied successfully'}></Modal>}

                {/* Puntos del usuario */}
                <div className='discount-points'>
                    <p>You have accumulated:</p>
                    <p className='points'>{user?.points} points</p>
                </div>

                {/* Botón para conseguir tu descuento */}
                <div className='discount-button'>
                    <button onClick={getDiscount}>¡GET DISCOUNT!</button>
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