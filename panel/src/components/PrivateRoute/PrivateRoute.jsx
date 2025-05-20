import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api_service';

function PrivateRoute({ children }) {

  // Autenticación del usuario
  const [isAuth, setIsAuth] = useState(true);

  // Validación de token, en caso de expirar o error mandamos al usuario al login
  useEffect(() => {

    const validateToken = async () => {

      // Caso en el que no hay token almacenado
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        // Caso en el que el usuario existe
        const user = await getCurrentUser();
        setIsAuth(!!user);

        // Caso en el que ha expirado el token
        if (!user) {
          localStorage.removeItem("token");
          setIsAuth(false);
        }

      // Caso de error (por ejemplo, no hay conexión)
      } catch (e) {
        // Si el usuario está sin conexión, permitimos navegación offline
        if (!navigator.onLine) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("token");
          setIsAuth(false);
        }
      }
    }

    validateToken();

  }, [window.location.pathname]); // Dependencia de cambio de ruta

  // Si el usuario está autenticado navegará a la ruta especificada, sino se redirigirá al Login
  return isAuth ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
