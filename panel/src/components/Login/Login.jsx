import Button from '../Button/Button'
import logo from '../../assets/imgs/logo.svg';
import downLine from '../../assets/imgs/down_line.svg';
import user from '../../assets/imgs/user.svg';
import password from '../../assets/imgs/password.svg';
import password2 from '../../assets/imgs/password_2.svg';

import '../../styles/fonts.css'
import '../../styles/colors.css'
import './Login.css'

// Componente general Login
function Login ({signUp}) {
    return (

        // Pantalla completa
        <div className='principal-card'>

            {/* Título */}
            <div className='header'>
                <h1 className='tittle'>DE LYSÉANT</h1>
                <img src={downLine}/>
            </div>

            {/* Contenido */}
            <form className='contain'>

                {/* Logo */}
                <div className='logo'>
                    <img src={logo}/>
                </div>

                {/* Formulario */}
                <div className='secondary-card'>

                    {/* Usuario */}
                    <div className='input-container'>
                        <img id='user' src={user}/>
                        <input className='inputs' type="text" placeholder='User' required/>
                    </div>

                    {/* Contraseña */}
                    <div className='input-container'>
                        <img id='password' src={password}/>
                        <input className='inputs' type="password" placeholder='Password' required/>
                    </div>

                    {/* Confirmar contraseña */}
                    {signUp &&
                    <div className='input-container'>
                        <img id='password2' src={password2}/>
                        <input className='inputs' type="password" placeholder='Confirm Password' required/>
                    </div>
                    }
                </div>

                {signUp && <a href="/">Sign in</a>}
                {!signUp && <a href="/signUp">Sign up</a>}
                

                {/* Botón */}
                <div className='button'>
                    {!signUp && <Button width={'34vw'} height={'4.5vh'} text={'Access'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>}
                    {signUp && <Button width={'34vw'} height={'4.5vh'} text={'Sign up'} borderWidth={'0.3vh'} borderColor={'var(--tertiary)'}></Button>}
                </div>
            </form>

        </div>
    )
}

export default Login