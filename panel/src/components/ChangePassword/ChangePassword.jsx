// Estilo
import './ChangePassword.css'

// Componentes
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import Footer from '../Footer/Footer';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

// Funcionalidad
import { useEffect, useState } from 'react';
import { checkPassword, getCurrentUser, updateUser } from '../../services/api_service';

// Imagenes
import passwordSvg from '../../assets/imgs/password.svg';
import password2Svg from '../../assets/imgs/password_2.svg';

// Página de login donde el usuario inicia sesión
function ChangePassword() {

    // Datos del usuario y las contraseñas
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)

    // Modales
    const [passwordModal, setPasswordModal] = useState(false)
    const [existPasswordModal, setExistPasswordModal] = useState(false)
    const [newPasswordModal, setNewPasswordModal] = useState(false)
    const [successChangeModal, setSuccessChangeModal] = useState(false)
 
    // Datos del usuario
    useEffect(() => {

        // Datos del usuario
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUser(user)
        };

        fetchUser()

    }, []);

    // Funcion para cambiar la contraseña
    async function changePassword(e) {

        // Todos los campos rellenos
        if (password && newPassword && confirmNewPassword){

            // Evitar que al pulsar el boton se vacíen los campos
            e.preventDefault()
            
            // Caso en el que la contraseña actual no coincide
            if (! await checkPassword(user?.name, password)){

                // Modal de aviso
                setPasswordModal(true)
                setTimeout( () => {
                    setPasswordModal(false)
                }, 2000)

            // Caso en el que la nueva contraseña es igual a la anterior
            }else if (password === newPassword){

                // Modal de aviso
                setExistPasswordModal(true)
                setTimeout( () => {
                    setExistPasswordModal(false)
                }, 2000)

            // Caso en el que las nuevas contraseñas no coinciden
            }else if(newPassword != confirmNewPassword){

                // Modal de aviso
                setNewPasswordModal(true)
                setTimeout( () => {
                    setNewPasswordModal(false)
                }, 2000)

            // Cambio de contraseña correcto
            }else{

                // Modificar el usuario con la nueva contraseña
                const updatedUser = {
                    name: user?.name,
                    password: newPassword
                };

                // En caso de fallo
                if (! await updateUser(updatedUser)){
                    return
                }

                // Modal de aviso
                setSuccessChangeModal(true)
                setTimeout( () => {
                    setSuccessChangeModal(false)
                    window.location.reload()
                }, 2000)
            }
        }

    }


    return (

        <div>
            
            {/* Cabecera del perfil */}
            <ProfileHeader user={user}></ProfileHeader>

            {/* Cuerpo de la página Cambio de contraseña */}
            <div className='change-password-body'>

                {/* Modales de validación y errores */}
                { passwordModal && <Modal text={'Your password is incorrect'} type={'cross'}></Modal>}
                { newPasswordModal && <Modal text={'New passwords must match'} type={'cross'}></Modal>}
                { existPasswordModal && <Modal text={'Your new password cannot match your old one'} type={'cross'}></Modal>}
                { successChangeModal && <Modal text={'Password changed succesfully'}></Modal>}

                {/* Formulario de cambio de contraseña */}
                <form className='change-password-form'>

                    {/* Contraseña actual del usuario */}
                    <div className='input-container'>
                        <PasswordInput onChange={ (e) => {setPassword(e.target.value)} } srcPassword={passwordSvg} placeholder={'Last Password'}></PasswordInput>
                    </div>

                    {/* Nueva contraseña */}
                    <div className='input-container'>
                        <PasswordInput onChange={ (e) => {setNewPassword(e.target.value)} } srcPassword={password2Svg} placeholder={'New Password'}></PasswordInput>
                    </div>

                    {/* Confirmar nueva contraseña */}
                    <div className='input-container'>
                        <PasswordInput onChange={ (e) => {setConfirmNewPassword(e.target.value)} } srcPassword={password2Svg} placeholder={'Confirm New Password'}></PasswordInput>
                    </div>

                    {/* Boton de cambio de contraseña */}
                    <Button className={'change-password-button'} onClick={changePassword} width={'34vw'} height={'4.5vh'} text={'Change'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>

                </form>

            </div>

            {/* Footer general */}
            <Footer></Footer>

        </div>

    )
}

export default ChangePassword