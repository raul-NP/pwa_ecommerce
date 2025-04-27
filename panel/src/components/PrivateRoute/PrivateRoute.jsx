import { Navigate } from 'react-router-dom';

// El usuario que no este loggeado no podrá acceder a las rutas de dentro de la aplicación
function PrivateRoute({ children }) {
  return !!localStorage.getItem("token") ? children : <Navigate to="/" />;
}

export default PrivateRoute;