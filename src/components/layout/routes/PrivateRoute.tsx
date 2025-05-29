import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { AppRoute } from '@/utils/const';

export const PrivateRoute = () => {
    const isAuth = useIsAuth();
    return isAuth ? <Outlet /> : <Navigate to={AppRoute.AUTH} replace />;
};
