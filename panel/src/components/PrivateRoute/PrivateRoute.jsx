import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api_service';

function PrivateRoute({ children }) {

  // Autenticacion del usuario
  const [isAuth, setIsAuth] = useState(true);

  // Validación de token, en caso de expirar mandamos al usuario al login
  useEffect(() => {

    const validateToken = async () => {

      try {
        // Caso en el que existe el usuario
        const user = await getCurrentUser()
        setIsAuth(true);

        // Caso en el que ha expirado el token
        if (!user){
          localStorage.removeItem("token")
          setIsAuth(false);
        }

      // Caso de error
      } catch (e) {
        localStorage.removeItem("token")
        setIsAuth(false);
      }
    }

    validateToken()

  }, [window.location.pathname]) // Dependencia de cambio de ruta

  // Si el usuario esta autenticado navegara a la ruta especificada, sino se redirigira al Login
  return isAuth ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;