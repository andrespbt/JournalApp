import { Navigate, Outlet } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  return <Outlet />;
};

export const childAuthRoutes = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '/auth/**',
    element: (
      <Navigate
        to="/auth/login"
        replace
      />
    ),
  },
];
