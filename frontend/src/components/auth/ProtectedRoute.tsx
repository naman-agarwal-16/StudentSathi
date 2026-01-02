import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Check if the user is logged in
  // Ideally, we check your AuthContext or Redux store. 
  // For now, we'll check if the token exists in localStorage (the simplest check).
  const token = localStorage.getItem('token'); 
  const location = useLocation();

  // 2. If no token, kick them out
  if (!token) {
    // replace: true prevents them from hitting "Back" to return to the protected page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If token exists, let them pass (render the child routes)
  return <Outlet />;
};

export default ProtectedRoute;