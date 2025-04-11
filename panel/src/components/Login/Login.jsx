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
                <img src={downLine} width='200vw' />
            </div>

            {/* Contenido */}
            <div className='contain'>

                {/* Logo */}
                <div className='logo'>
                    <img src={logo} width='65vh'/>
                </div>

                {/* Formulario */}
                <div className='secondary-card'>

                </div>

                {/* Botón */}
                <div className='button'>
                    {!signUp && <Button width={'30vw'} height={'5vh'}></Button>}
                    {signUp && <Button width={'100vw'}></Button>}
                </div>
            </div>

        </div>
    )
}

export default Login