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
        <div className='principal-card'>

            <div className='header'>
                <h1 className='tittle'>DE LYSÉANT</h1>
                <img src={downLine} width='200vw' />
            </div>

            <div className='contain'>

                <div className='logo'>
                    <img src="" alt="" />
                </div>

                <div className='secondary-card'>

                </div>

                {signUp && <Button width={'100px'}></Button>}
                {!signUp && <Button width={'100px'}></Button>}
            </div>

        </div>
    )
}

export default Login