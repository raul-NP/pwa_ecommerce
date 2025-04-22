// Imágenes
import eye from '../../assets/imgs/eye.svg';
import closeEye from '../../assets/imgs/closeEye.svg';

// Funcionalidades
import { useState } from 'react';

// Botón genérico para toda la aplicación
function PasswordInput ({ onChange, srcPassword, placeholder }){
    
    const [visiblePassword, setVisiblePassword] = useState(false)
    const passwordType = visiblePassword ? 'text': 'password'; 
    const passwordViewImage = visiblePassword ? eye : closeEye;  

    // Cambiamos el estado de visibilidad de contraseña
    function handleClick(){
        setVisiblePassword(!visiblePassword)
    }

    return (
        <>
            <img id='password' src={srcPassword}/>
            <input onChange={ onChange } className='inputs' type={passwordType} placeholder={placeholder} maxLength={15} required/>
            <img onClick={handleClick} id='view' src={passwordViewImage}/>
        </>
    )
}

export default PasswordInput