// Estilo
import './App.css'

// Funcionalidades
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import HomePage from '../../pages/HomePage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicRoute from '../PublicRoute/PublicRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
          } />

        <Route path="/signUp" element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        } />

        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        {/* Rutas protegidas según autenticación */}
        <Route path="*" element={ <Navigate to={ !!localStorage.getItem("token") ? "/home" : "/"} replace /> } />
      </Routes>
    </Router>
  );
}

export default App;