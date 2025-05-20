import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api_service';

function PrivateAdminRoute({ children }) {

  // Autenticación del usuario
  const [isAuth, setIsAuth] = useState(true);

  // Validación de token y rol, en caso de error mandamos al usuario al login
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

        // Caso en el que ha expirado el token
        if (!user) {
          localStorage.removeItem("token");
          setIsAuth(false);

        // Caso en el que el usuario es admin
        } else if (user?.rol === "admin") {
          setIsAuth(true);

        // Caso en el que el usuario no es administrador
        } else {
          setIsAuth(false);
        }

      // Caso de error (por ejemplo, no hay conexión)
      } catch (e) {
        
        // Si está sin conexión, permitimos acceso si ya había token
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

export default PrivateAdminRoute;
