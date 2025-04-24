import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  return !!localStorage.getItem("token") ? <Navigate to="/home" /> : children ;
}

export default PublicRoute;