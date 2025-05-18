import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api_service';

function PrivateAdminRoute({ children }) {

  // Autenticacion del usuario
  const [isAuth, setIsAuth] = useState(true);

  // Validación de token, en caso de expirar mandamos al usuario al login
  useEffect(() => {

    const validateToken = async () => {

    const user = await getCurrentUser()

      // Caso en el que existe el usuario
      if (user) {

        // Comprobación de si es admin para poder acceder a la ruta
        if (user?.rol === "admin"){
            setIsAuth(true);
        }else{
            setIsAuth(false)
        }

      // Caso en el que ha expirado el token
      } else {
        localStorage.removeItem("token")
        setIsAuth(false);
      }
    }

    validateToken()

  }, [window.location.pathname]) // Dependencia de cambio de ruta

  // Si el usuario esta autenticado y es admin navegara a la ruta especificada, 
  // sino se redirigira al Login en caso de expiración de token o al Home si todavía tiene token
  return isAuth ? children : <Navigate to="/" replace />;
}

export default PrivateAdminRoute;