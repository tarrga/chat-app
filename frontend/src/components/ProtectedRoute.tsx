import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ user, redirectPath = '/landing' }: { user: string | null; redirectPath?: string }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
