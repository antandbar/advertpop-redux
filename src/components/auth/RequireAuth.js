import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

// si no se está logeado devuelve a página de login
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
