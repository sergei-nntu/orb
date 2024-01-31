import React from 'react';
import { Navigate } from 'react-router-dom';

import { DISABLED_PATHS } from '../../constants';
import { useRouter } from '../../hooks/Router/Router';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export default function ProtectedRoute(props: ProtectedRouteProps) {
    const router = useRouter();

    if (DISABLED_PATHS.includes(router.pathname)) {
        return <Navigate to="/" />;
    }

    return <>{props.children}</>;
}
