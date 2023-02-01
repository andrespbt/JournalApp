import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthRoutes, childAuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { childJournalRoutes, JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {
  const status = useCheckAuth();

  const isAuthenticated = status === 'authenticated';

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  const router = createBrowserRouter([
    {
      path: '/auth/*',
      element: isAuthenticated ? <Navigate to="/" /> : <AuthRoutes />,
      children: childAuthRoutes,
    },
    {
      path: '/',
      element: isAuthenticated ? <JournalRoutes /> : <Navigate to="/auth/login" />,
      children: childJournalRoutes,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
