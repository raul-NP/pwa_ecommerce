import { Navigate } from 'react-router-dom';

// El usuario loggeado no podrá acceder al login sin cerrar sesión
function PublicRoute({ children }) {
  return !!localStorage.getItem("token") ? <Navigate to="/home" /> : children ;
}

export default PublicRoute;