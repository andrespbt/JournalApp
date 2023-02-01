import { Navigate, Outlet } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';

export const JournalRoutes = () => {
  return <Outlet />;
};

export const childJournalRoutes = [
  {
    path: '/',
    element: <JournalPage />,
  },
  {
    path: '/*',
    element: <Navigate to="/" />,
  },
];
