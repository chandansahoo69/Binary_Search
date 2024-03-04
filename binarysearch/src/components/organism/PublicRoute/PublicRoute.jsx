import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'components/molecules';
import routes from 'config/routes';
import { getAccessToken } from 'services/ApiService';

export const PublicRoute = ({ children }) => {
    // const token = true;
    const token = getAccessToken();
    console.log('user is authenticated public', token);

    if (token) {
        return (
            <Navigate
                to={{
                    pathname: routes.dashboard.path,
                }}
            />
        );
    }

    return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};
