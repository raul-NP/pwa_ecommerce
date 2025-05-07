// Estilo
import './App.css'

// Funcionalidades
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import HomePage from '../../pages/HomePage';
import CategoriesPage from '../../pages/CategoriesPage';
import ProfilePage from '../../pages/ProfilePage';
import OrderPage from '../../pages/OrderPage';
import DiscountPage from '../../pages/DiscountPage';
import ChangePasswordPage from '../../pages/ChangePasswordPage';
import AdminPanelPage from '../../pages/AdminPanelPage';

// Protección de rutas
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

        <Route path="/categories" element={
          <PrivateRoute>
            <CategoriesPage />
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />

        <Route path="/profile/orders" element={
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        } />

        <Route path="/profile/discounts" element={
          <PrivateRoute>
            <DiscountPage />
          </PrivateRoute>
        } />

        <Route path="/profile/password" element={
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        } />

        <Route path="/profile/admin" element={
          <PrivateRoute>
            <AdminPanelPage />
          </PrivateRoute>
        } />

        {/* Rutas protegidas según autenticación */}
        <Route path="*" element={ <Navigate to={ !!localStorage.getItem("token") ? "/home" : "/"} replace /> } />
      </Routes>
    </Router>
  );
}

export default App;