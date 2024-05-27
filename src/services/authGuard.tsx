import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    user: boolean;
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
   return <Navigate to="/" replace />;
    }
  return children;
  };

