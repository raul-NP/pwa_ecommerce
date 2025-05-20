// Estilo
import './Profile.css'

// Componentes
import Footer from '../Footer/Footer';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

// Funcionalidad
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/api_service';
import { useNavigate } from 'react-router-dom';

// Imágenes
import orderSvg from '../../assets/imgs/order.svg';
import discountSvg from '../../assets/imgs/discount.svg';
import lockSvg from '../../assets/imgs/password_2.svg';
import logoutSvg from '../../assets/imgs/logout.svg';
import adminSvg from '../../assets/imgs/admin.svg';
import ModalConfirm from '../Modal/ModalConfirm';

// Componente perfil
function Profile() {

    const [user, setUser] = useState(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate()
 
    // Datos del usuario
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        fetchUser()
    }, []);

    // Cierre de sesión del usuario
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/")
    };

    return (

        <div>

            {/* Modal de confirmacion para el logout */}
            <ModalConfirm showModal={showConfirmModal} setShowModal={setShowConfirmModal} onConfirm={logout} message="Are you sure you want to logout?"></ModalConfirm>

            {/* Cabecera del perfil */}
            <ProfileHeader text={"PROFILE"} user={user}></ProfileHeader>

            {/* Cuerpo del perfil */}
            <div className='perfil-body'>

                {/* Opciones de navegacion del perfil */}
                <div className='perfil-options-body'>

                    {/* Cada fila de 2 opciones */}
                    <div className='perfil-options-row'>
                        <div className='perfil-option' onClick={() => navigate("/profile/orders")}>
                            <h1>Orders</h1>
                            <img src={orderSvg}/>
                        </div>
                        <div className='perfil-option' onClick={() => navigate("/profile/discounts")}>
                            <h1>Discounts</h1>
                            <img src={discountSvg}/>
                        </div>
                    </div>
                    <div className='perfil-options-row'>
                        <div className='perfil-option' onClick={() => navigate("/profile/password")}>
                            <h1>Change password</h1>
                            <img src={lockSvg}/>
                        </div>
                        <div className='perfil-option' onClick={() => setShowConfirmModal(true)}>
                            <h1>Logout</h1>
                            <img src={logoutSvg}/>
                        </div>
                    </div>
                    { user?.rol == 'admin' && <div className='perfil-options-row'>
                        <div className='perfil-option' onClick={() => navigate("/profile/admin")}>
                            <h1>Admin panel</h1>
                            <img src={adminSvg}/>
                        </div>
                    </div>}
                </div>

                {/* Datos de puntuaje del usuario */}
                <div className='perfil-points-body'>

                    {/* Puntos del usuario */}
                    <div className='perfil-points'>
                        <p>You have accumulated:</p>
                        <p className='points'>{user?.points} points</p>
                    </div>

                    {/* Reglas de descuento segun puntuaje */}
                    <div className='perfil-points-description'>
                        <p>You will get 1 point for every $10 spent.</p>
                        <p>For each 100 points, you will get $50 of discount.</p>
                        <p>You can spend the discount on every purchase over $400.</p>
                        <p>Promotions are not cumulative.</p>
                        <p>You can only have one active promotion.</p>
                    </div>
                </div>
            </div>

            {/* Menú footer de la aplicación */}
            <Footer></Footer>
            
        </div>
    )
}

export default Profile