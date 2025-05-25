import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import { AppRoute } from '@/utils/const';

export const PublicOnlyRoute = () => {
    const isAuth = useIsAuth();

    return isAuth ? <Navigate to={AppRoute.EVENT_LIST} replace /> : <Outlet />;
};
