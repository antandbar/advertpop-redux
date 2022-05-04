import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context';

// si no se está logeado devuelve a página de login
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isLogged } = useContext(AuthContext);
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
