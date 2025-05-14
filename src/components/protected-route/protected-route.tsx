import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsLogin } from '../../services/slices/user';
import { Preloader } from '../ui/preloader';
import { getCookie } from '../../utils/cookie';
const token = getCookie('accessToken');

type ProtectedRouteProps = {
  loginOnly?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  loginOnly
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);

  if (!isLogin && token) return <Preloader />;

  if (loginOnly && !isLogin) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (!loginOnly && isLogin) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
