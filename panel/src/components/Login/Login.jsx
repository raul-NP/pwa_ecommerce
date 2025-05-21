// Componentes
import Button from '../Button/Button'
import PasswordInput from '../PasswordInput/PasswordInput';
import Modal from '../Modal/Modal';

// Imagenes
import logoSvg from '../../assets/imgs/logo.svg';
import downLineSvg from '../../assets/imgs/down_line.svg';
import userSvg from '../../assets/imgs/user.svg';
import passwordSvg from '../../assets/imgs/password.svg';
import password2Svg from '../../assets/imgs/password_2.svg';

// Fuentes y estilos
import '../../styles/fonts.css'
import '../../styles/colors.css'
import './Login.css'

// Funcionalidades
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { registerUser, login } from '../../services/api_service';

// Componente general Login
function Login ({signIn}) {

    // Credenciales
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Navegación
    const navigate = useNavigate()

    // Modales
    const [existModal, setExistModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [incorrectModal, setIncorrectModal] = useState(false)
    const [charsModal, setCharsModal] = useState(false)

    // Función para comprobar si el nombre de usuario contiene solo letras
    function haveOnlyLetters(userName) {

        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        return regex.test(userName.trim());
    }

    // Función para registrar el usuario
    async function signUp(e) {
                
        // Campos rellenos
        if (user && password && confirmPassword){
            
            // Evitar que al pulsar el boton se vacíen los campos
            e.preventDefault()
            
            // Evitar sobrecarga de clics
            if (existModal || passwordModal || successModal) return;
                
            // Comprobamos que las contraseñas son iguales
            if (password != confirmPassword){

                // Modal de aviso
                setPasswordModal(true)
                setTimeout( () => {
                    setPasswordModal(false)
                }, 2000)

            // Comprobamos registro
            }else{

                // Creamos los datos del usuario
                const newUser = {
                    name: user,
                    password: password,
                    points: 0,
                    rol: "user"
                }

                // Caso en el que el nombre contiene caracteres distintos a letras
                if (!haveOnlyLetters(user)){

                    // Modal de aviso
                    setCharsModal(true)
                    setTimeout( () => {
                        setCharsModal(false)
                    }, 2000)

                // Caso en el que el nombre de usuario ya existe
                }else if (! await registerUser(newUser)){

                    // Modal de aviso
                    setExistModal(true)
                    setTimeout( () => {
                        setExistModal(false)
                    }, 2000)
                    
                // Registro con éxito
                }else{
                    
                    // Modal avisando que el usuario se registro con éxito
                    setSuccessModal(true)
                    setTimeout( () => {
                        setSuccessModal(false)
                    }, 2000)
                    
                    // Navegamos al login
                    setTimeout( () => {
                        navigate("/")
                    }, 2000)
                }
            }
        }
    }

    // Función que realiza el login del usuario
    async function access(e) {

        // Campos rellenos
        if (user && password){
            
            // Evitar que al pulsar el boton se vacíen los campos
            e.preventDefault()
            
            // Evitar sobrecarga de clics
            if (incorrectModal) return;

            // Caso de que las credenciales son incorrectas
            if (!await login(user, password)){

                // Modal de aviso
                setIncorrectModal(true);
                setTimeout(() => {
                    setIncorrectModal(false)
                }, 2000);

            // Login con éxito
            }else{
                navigate("/home")
            }
        }
    }

    return (

        // Pantalla completa
        <div className='principal-card'>

            {/* Modales de validación y errores */}
            { charsModal && <Modal text={'The username must contain only letters'} type={'cross'}></Modal>}
            { passwordModal && <Modal text={'Passwords must be identical'} type={'cross'}></Modal>}
            { existModal && <Modal text={'A user with that name already exists.'} type={'cross'}></Modal>}
            { successModal && <Modal text={'User successfully registered'}></Modal>}
            { incorrectModal && <Modal text={'Incorrect username or password'} type={'cross'}></Modal>}

            {/* Título */}
            <div className='header'>
                <h1 className='tittle'>DE LYSÉANT</h1>
                <img src={downLineSvg}/>
            </div>

            {/* Contenido */}
            <form className='contain'>

                {/* Logo principal */}
                <div className='logo'>
                    <img src={logoSvg}/>
                </div>

                {/* Formulario */}
                <div className='secondary-card'>

                    {/* Usuario */}
                    <div className='input-container'>
                        <img id='user' src={userSvg}/>
                        <input onChange={ (e) => {setUser(e.target.value)} } className='inputs' type="text" placeholder='Username' maxLength={20} required/>
                    </div>

                    {/* Contraseña */}
                    <div className='input-container'>
                        <PasswordInput onChange={ (e) => {setPassword(e.target.value)} } srcPassword={passwordSvg} placeholder={'Password'}></PasswordInput>
                    </div>

                    {/* Confirmar contraseña */}
                    {!signIn &&
                    <div className='input-container'>
                        <PasswordInput onChange={ (e) => {setConfirmPassword(e.target.value)} } srcPassword={password2Svg} placeholder={'Confirm Password'}></PasswordInput>
                    </div>
                    }
                </div>

                {/* Enlaces para navegar entre páginas del login */}
                {signIn && <a onClick={() => navigate("/signUp")}>Sign up</a>}
                {!signIn && <a onClick={() => navigate("/")}>Sign in</a>}
                

                {/* Botón acceso o signUp*/}
                <div className='button'>
                    {signIn && <Button onClick={access} width={'34vw'} height={'4.5vh'} text={'Access'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>}
                    {!signIn && <Button onClick={signUp} width={'34vw'} height={'4.5vh'} text={'Sign up'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>}
                </div>
            </form>

        </div>
    )
}

export default Login