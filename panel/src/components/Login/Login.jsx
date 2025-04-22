// Componentes
import Button from '../Button/Button'
import PasswordInput from '../PasswordInput/PasswordInput';

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

// Componente general Login
function Login ({signIn}) {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const API_URL = import.meta.env.VITE_API_URL;

    // Función para recoger los usuarios de la aplicación
    async function getUsers() {
        return await fetch(`${API_URL}/api/users`)
        .then(response => {
            return response.json();
        })
    }

    // Función para registrar el usuario
    async function signUp(e) {
        
        if (user && password && confirmPassword){

            // Evitamos la animación de vaciado de campos
            e.preventDefault()

            // Recogemos los usuarios de la aplicación
            const users = await getUsers()

            console.log(users);
            

            // Comprobamos si existe el usuario

            // En caso de que exista avisamos al usuario que ya existe el usuario con ese nombre

            // En caso de que no exista, registramos el usuario

        }
    }

    function access(e) {
        
    }

    return (

        // Pantalla completa
        <div className='principal-card'>

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
                        <input onChange={ (e) => {setUser(e.target.value)} } className='inputs' type="text" placeholder='User' maxLength={20} required/>
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

                {signIn && <a href="/signUp">Sign up</a>}
                {!signIn && <a href="/">Sign in</a>}
                

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